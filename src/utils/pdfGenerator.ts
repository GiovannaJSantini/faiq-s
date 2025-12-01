import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Assessment } from '@/types/faiq';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { faiqAreas } from '@/data/faiqData';
import { AIAnalysis } from '@/hooks/useAIAnalysis';

const PRIMARY_COLOR: [number, number, number] = [31, 168, 122]; // #1FA87A
const ACCENT_COLOR: [number, number, number] = [242, 140, 40]; // #F28C28
const GRAY_DARK: [number, number, number] = [75, 83, 90]; // #4B535A
const GRAY_LIGHT: [number, number, number] = [242, 245, 247]; // #F2F5F7

export const generateAssessmentPDF = (
  assessment: Assessment,
  clinicName: string,
  aiAnalysis?: AIAnalysis | null
) => {
  const doc = new jsPDF();
  let currentY = 20;

  // Helper function to add new page if needed
  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > 280) {
      doc.addPage();
      currentY = 20;
      return true;
    }
    return false;
  };

  // ===== CAPA =====
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de Avaliação', 105, 100, { align: 'center' });
  doc.text('FAIQ-S', 105, 120, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text(clinicName, 105, 150, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }), 105, 170, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Avaliador: ${assessment.assessorName}`, 105, 240, { align: 'center' });
  doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 105, 255, { align: 'center' });

  // ===== PÁGINA 2: IDENTIFICAÇÃO =====
  doc.addPage();
  currentY = 20;
  
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Identificação da Organização', 20, currentY);
  currentY += 10;
  
  doc.setTextColor(...GRAY_DARK);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const identInfo = [
    ['Nome da instituição', clinicName],
    ['Data da avaliação', format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })],
    ['Responsável técnico', assessment.assessorName],
    ['Classificação', assessment.classification === 'excelencia' ? 'Excelência' : assessment.classification === 'qualidade' ? 'Qualidade' : 'Padrão']
  ];
  
  autoTable(doc, {
    startY: currentY,
    head: [],
    body: identInfo,
    theme: 'plain',
    styles: { fontSize: 11, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 120 }
    }
  });
  
  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== PONTUAÇÃO GERAL =====
  checkPageBreak(40);
  doc.setFillColor(...GRAY_LIGHT);
  doc.rect(20, currentY, 170, 30, 'F');
  
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Pontuação Geral', 25, currentY + 10);
  
  doc.setFontSize(24);
  doc.text(`${assessment.overallPercentage.toFixed(1)}%`, 160, currentY + 12, { align: 'right' });
  
  doc.setFontSize(10);
  doc.setTextColor(...GRAY_DARK);
  doc.text(`${assessment.totalScore.toFixed(1)} / ${assessment.maxScore} pontos`, 25, currentY + 22);
  
  const classColor: [number, number, number] = assessment.classification === 'excelencia' ? PRIMARY_COLOR : 
                     assessment.classification === 'qualidade' ? [59, 130, 246] : ACCENT_COLOR;
  doc.setTextColor(...classColor);
  const classText = assessment.classification === 'excelencia' ? 'Excelência' : 
                    assessment.classification === 'qualidade' ? 'Qualidade' : 'Padrão';
  doc.text(`Classificação: ${classText}`, 160, currentY + 22, { align: 'right' });
  
  currentY += 40;

  // ===== ESTATÍSTICAS =====
  checkPageBreak(50);
  const totalIndicators = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.length, 0
    ), 0
  );

  const excellenceCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 1).length, 0
    ), 0
  );

  const qualityCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 0.5).length, 0
    ), 0
  );

  const standardCount = totalIndicators - excellenceCount - qualityCount;

  const statsData = [
    ['Indicadores de Excelência', `${excellenceCount} (${((excellenceCount / totalIndicators) * 100).toFixed(1)}%)`],
    ['Indicadores de Qualidade', `${qualityCount} (${((qualityCount / totalIndicators) * 100).toFixed(1)}%)`],
    ['Indicadores Padrão', `${standardCount} (${((standardCount / totalIndicators) * 100).toFixed(1)}%)`]
  ];

  autoTable(doc, {
    startY: currentY,
    head: [],
    body: statsData,
    theme: 'grid',
    headStyles: { fillColor: PRIMARY_COLOR },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 100 },
      1: { cellWidth: 70 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== RESULTADOS POR ÁREA =====
  checkPageBreak(30);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Resultados por Área', 20, currentY);
  currentY += 10;

  const areaTableData = assessment.areaScores.map((areaScore) => {
    const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
    return [
      areaData?.name || `Área ${areaScore.areaId}`,
      `${areaScore.totalScore.toFixed(1)}`,
      `${areaScore.maxScore}`,
      `${areaScore.percentage.toFixed(1)}%`
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Área', 'Pontuação', 'Máximo', 'Percentual']],
    body: areaTableData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: GRAY_LIGHT
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== ANÁLISE QUALITATIVA =====
  checkPageBreak(30);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(18);
  doc.text('3. Análise Qualitativa', 20, currentY);
  currentY += 10;

  doc.setTextColor(...GRAY_DARK);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Pontos Fortes', 20, currentY);
  currentY += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const strongAreas = assessment.areaScores.filter(area => area.percentage >= 70);
  if (strongAreas.length > 0) {
    strongAreas.forEach(area => {
      checkPageBreak(10);
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      doc.text(`• ${areaData?.name || `Área ${area.areaId}`} - ${area.percentage.toFixed(1)}%`, 25, currentY);
      currentY += 6;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.text('Nenhuma área atingiu 70% ou mais', 25, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
  }

  currentY += 5;
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Oportunidades de Melhoria', 20, currentY);
  currentY += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const weakAreas = assessment.areaScores.filter(area => area.percentage < 50);
  if (weakAreas.length > 0) {
    weakAreas.forEach(area => {
      checkPageBreak(10);
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      doc.text(`• ${areaData?.name || `Área ${area.areaId}`} - ${area.percentage.toFixed(1)}%`, 25, currentY);
      currentY += 6;
    });
  } else {
    doc.setFont('helvetica', 'italic');
    doc.text('Todas as áreas atingiram pelo menos 50%', 25, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
  }

  currentY += 10;

  // ===== PLANO DE AÇÃO =====
  checkPageBreak(30);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Plano de Ação Estratégico', 20, currentY);
  currentY += 10;

  // 30 dias
  doc.setTextColor(...GRAY_DARK);
  doc.setFontSize(12);
  doc.text('Horizonte 30 Dias – Operacional', 20, currentY);
  currentY += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const immediate = assessment.areaScores.filter(a => a.percentage < 40).slice(0, 3);
  immediate.forEach(area => {
    checkPageBreak(10);
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    doc.text(`→ Revisar e padronizar processos em ${areaData?.name}`, 25, currentY);
    currentY += 6;
  });
  currentY += 5;

  // 90 dias
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Horizonte 90 Dias – Estrutural', 20, currentY);
  currentY += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const structural = assessment.areaScores.filter(a => a.percentage >= 40 && a.percentage < 60).slice(0, 3);
  structural.forEach(area => {
    checkPageBreak(10);
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    doc.text(`→ Desenvolver diretrizes formais para ${areaData?.name}`, 25, currentY);
    currentY += 6;
  });
  currentY += 5;

  // 12 meses
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Horizonte 12 Meses – Transformação', 20, currentY);
  currentY += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('→ Implementar dashboards de qualidade para todas as áreas', 25, currentY);
  currentY += 6;
  doc.text('→ Estabelecer comitês de qualidade e compliance', 25, currentY);
  currentY += 6;
  doc.text('→ Desenvolver programa de certificação interno', 25, currentY);
  currentY += 10;

  // ===== ANÁLISE IA (se disponível) =====
  if (aiAnalysis) {
    doc.addPage();
    currentY = 20;
    
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('5. Análise Inteligente com IA', 20, currentY);
    currentY += 10;

    // Sumário Executivo
    if (aiAnalysis.executive_summary) {
      doc.setTextColor(...GRAY_DARK);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Sumário Executivo', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const summaryLines = doc.splitTextToSize(aiAnalysis.executive_summary, 170);
      summaryLines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // SWOT
    if (aiAnalysis.swot_strengths || aiAnalysis.swot_weaknesses || aiAnalysis.swot_opportunities || aiAnalysis.swot_threats) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Análise SWOT', 20, currentY);
      currentY += 7;

      if (aiAnalysis.swot_strengths) {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Forças:', 20, currentY);
        currentY += 5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(aiAnalysis.swot_strengths, 170);
        lines.forEach((line: string) => {
          checkPageBreak(10);
          doc.text(line, 25, currentY);
          currentY += 5;
        });
        currentY += 3;
      }

      if (aiAnalysis.swot_weaknesses) {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Fraquezas:', 20, currentY);
        currentY += 5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(aiAnalysis.swot_weaknesses, 170);
        lines.forEach((line: string) => {
          checkPageBreak(10);
          doc.text(line, 25, currentY);
          currentY += 5;
        });
        currentY += 3;
      }

      if (aiAnalysis.swot_opportunities) {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Oportunidades:', 20, currentY);
        currentY += 5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(aiAnalysis.swot_opportunities, 170);
        lines.forEach((line: string) => {
          checkPageBreak(10);
          doc.text(line, 25, currentY);
          currentY += 5;
        });
        currentY += 3;
      }

      if (aiAnalysis.swot_threats) {
        checkPageBreak(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Ameaças:', 20, currentY);
        currentY += 5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(aiAnalysis.swot_threats, 170);
        lines.forEach((line: string) => {
          checkPageBreak(10);
          doc.text(line, 25, currentY);
          currentY += 5;
        });
        currentY += 3;
      }
      currentY += 5;
    }

    // Análise de Riscos
    if (aiAnalysis.risk_analysis) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Análise de Riscos', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const riskLines = doc.splitTextToSize(aiAnalysis.risk_analysis, 170);
      riskLines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Recomendações Prioritárias
    if (aiAnalysis.priority_recommendations) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Recomendações Prioritárias', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const recLines = doc.splitTextToSize(aiAnalysis.priority_recommendations, 170);
      recLines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    // Planos de Ação IA
    if (aiAnalysis.action_plan_30_days) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Plano de Ação - 30 Dias (IA)', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(aiAnalysis.action_plan_30_days, 170);
      lines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    if (aiAnalysis.action_plan_90_days) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Plano de Ação - 90 Dias (IA)', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(aiAnalysis.action_plan_90_days, 170);
      lines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }

    if (aiAnalysis.action_plan_12_months) {
      checkPageBreak(30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Plano de Ação - 12 Meses (IA)', 20, currentY);
      currentY += 7;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(aiAnalysis.action_plan_12_months, 170);
      lines.forEach((line: string) => {
        checkPageBreak(10);
        doc.text(line, 20, currentY);
        currentY += 5;
      });
      currentY += 5;
    }
  }

  // ===== RODAPÉ EM TODAS AS PÁGINAS =====
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    if (i > 1) { // Skip footer on cover page
      doc.text(
        `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
        105,
        285,
        { align: 'center' }
      );
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    }
  }

  // Salvar PDF
  doc.save(`relatorio-${clinicName.replace(/\s+/g, '-').toLowerCase()}-${format(assessment.assessmentDate, 'yyyy-MM-dd')}.pdf`);
};

export const generateComparativePDF = (
  assessments: Assessment[],
  title: string = 'Relatório Comparativo'
) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(title, 105, 20, { align: 'center' });
  
  // Linha decorativa
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Informações gerais
  doc.setFontSize(12);
  doc.setTextColor(...GRAY_DARK);
  doc.text(`Total de Avaliações: ${assessments.length}`, 20, 35);
  doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 20, 42);
  
  // Média geral
  const avgScore = assessments.reduce((sum, a) => sum + a.overallPercentage, 0) / assessments.length;
  doc.setFillColor(...GRAY_LIGHT);
  doc.rect(20, 48, 170, 15, 'F');
  doc.setFontSize(12);
  doc.text(`Média Geral: ${avgScore.toFixed(1)}%`, 25, 58);
  
  // Tabela comparativa
  const tableData = assessments
    .sort((a, b) => b.overallPercentage - a.overallPercentage)
    .map((assessment, index) => [
      `${index + 1}º`,
      assessment.clinicName,
      format(assessment.assessmentDate, 'dd/MM/yyyy'),
      `${assessment.overallPercentage.toFixed(1)}%`,
      assessment.classification === 'excelencia' ? 'Excelência' : 
      assessment.classification === 'qualidade' ? 'Qualidade' : 'Padrão'
    ]);
  
  autoTable(doc, {
    startY: 70,
    head: [['Pos.', 'Clínica', 'Data', 'Pontuação', 'Classificação']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: GRAY_LIGHT
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 70 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 35 }
    }
  });
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  doc.save(`relatorio-comparativo-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
