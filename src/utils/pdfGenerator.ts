import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Assessment } from '@/types/faiq';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const generateAssessmentPDF = (
  assessment: Assessment,
  clinicName: string
) => {
  const doc = new jsPDF();
  
  // Configurar fonte
  doc.setFont('helvetica');
  
  // Título
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text('Relatório de Avaliação FAIQ-S', 105, 20, { align: 'center' });
  
  // Linha decorativa
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Informações básicas
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Clínica: ${clinicName}`, 20, 35);
  doc.text(`Avaliador: ${assessment.assessorName}`, 20, 42);
  doc.text(`Data: ${format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`, 20, 49);
  
  // Pontuação geral
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 55, 170, 25, 'F');
  doc.setFontSize(14);
  doc.setTextColor(0, 102, 204);
  doc.text('Pontuação Geral', 25, 65);
  doc.setFontSize(18);
  doc.text(`${assessment.overallPercentage.toFixed(1)}%`, 160, 65);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`${assessment.totalScore} / ${assessment.maxScore} pontos`, 25, 73);
  
  // Classificação
  let classificationText = '';
  let classificationColor: [number, number, number] = [100, 100, 100];
  
  if (assessment.classification === 'excelencia') {
    classificationText = 'Excelência';
    classificationColor = [34, 197, 94];
  } else if (assessment.classification === 'qualidade') {
    classificationText = 'Qualidade';
    classificationColor = [59, 130, 246];
  } else {
    classificationText = 'Padrão';
    classificationColor = [251, 146, 60];
  }
  
  doc.setTextColor(...classificationColor);
  doc.setFontSize(12);
  doc.text(`Classificação: ${classificationText}`, 160, 73, { align: 'right' });
  
  // Tabela de áreas
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Detalhamento por Área', 20, 90);
  
  const tableData = assessment.areaScores.map((areaScore, index) => [
    `Área ${index + 1}`,
    `${areaScore.totalScore.toFixed(1)}`,
    `${areaScore.maxScore}`,
    `${areaScore.percentage.toFixed(1)}%`
  ]);
  
  autoTable(doc, {
    startY: 95,
    head: [['Área', 'Pontuação', 'Máximo', 'Percentual']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 102, 204],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  });
  
  // Observações (se houver)
  const finalY = (doc as any).lastAutoTable.finalY || 95;
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      105,
      285,
      { align: 'center' }
    );
    doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  // Salvar PDF
  doc.save(`avaliacao-${clinicName.replace(/\s+/g, '-').toLowerCase()}-${format(assessment.assessmentDate, 'yyyy-MM-dd')}.pdf`);
};

export const generateComparativePDF = (
  assessments: Assessment[],
  title: string = 'Relatório Comparativo'
) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text(title, 105, 20, { align: 'center' });
  
  // Linha decorativa
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Informações gerais
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total de Avaliações: ${assessments.length}`, 20, 35);
  doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 20, 42);
  
  // Média geral
  const avgScore = assessments.reduce((sum, a) => sum + a.overallPercentage, 0) / assessments.length;
  doc.setFillColor(240, 240, 240);
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
      fillColor: [0, 102, 204],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
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