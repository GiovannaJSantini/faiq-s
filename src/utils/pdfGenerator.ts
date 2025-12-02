import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Assessment } from '@/types/faiq';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { faiqAreas } from '@/data/faiqData';
import { AIAnalysis } from '@/hooks/useAIAnalysis';

// Corporate Color Palette
const PRIMARY_COLOR: [number, number, number] = [31, 168, 122]; // #1FA87A - Verde Institucional
const ACCENT_COLOR: [number, number, number] = [242, 140, 40]; // #F28C28 - Laranja
const GRAY_DARK: [number, number, number] = [75, 83, 90]; // #4B535A
const GRAY_MEDIUM: [number, number, number] = [152, 161, 168]; // #98A1A8
const GRAY_LIGHT: [number, number, number] = [242, 245, 247]; // #F2F5F7

export const generateAssessmentPDF = (
  assessment: Assessment,
  clinicName: string,
  aiAnalysis?: AIAnalysis | null
) => {
  const doc = new jsPDF();
  let currentY = 20;

  // Helper: Check page break with wide margins
  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > 270) {
      doc.addPage();
      currentY = 25;
      return true;
    }
    return false;
  };

  // Helper: Add thin divider line
  const addDivider = () => {
    doc.setDrawColor(...GRAY_MEDIUM);
    doc.setLineWidth(0.3);
    doc.line(20, currentY, 190, currentY);
    currentY += 8;
  };

  // Helper: Section title
  const addSectionTitle = (title: string) => {
    checkPageBreak(20);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, currentY);
    currentY += 10;
  };

  // Helper: Subsection title
  const addSubsectionTitle = (title: string) => {
    checkPageBreak(15);
    doc.setTextColor(...GRAY_DARK);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, currentY);
    currentY += 7;
  };

  // Helper: Body text
  const addBodyText = (text: string, indent: number = 20) => {
    doc.setTextColor(...GRAY_DARK);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, 190 - indent);
    lines.forEach((line: string) => {
      checkPageBreak(7);
      doc.text(line, indent, currentY);
      currentY += 5;
    });
  };

  // Helper: Bullet point
  const addBullet = (text: string) => {
    checkPageBreak(7);
    doc.setTextColor(...GRAY_DARK);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, 160);
    lines.forEach((line: string, index: number) => {
      checkPageBreak(7);
      if (index === 0) {
        doc.text('•', 25, currentY);
        doc.text(line, 30, currentY);
      } else {
        doc.text(line, 30, currentY);
      }
      currentY += 5;
    });
  };

  // Calculate statistics
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

  const standardCount = assessment.areaScores.reduce((sum, area) => 
    sum + area.categoryScores.reduce((catSum, cat) => 
      catSum + cat.indicatorScores.filter(ind => ind.score === 0).length, 0
    ), 0
  );

  const criticalIndicators = assessment.areaScores.flatMap(area => {
    const areaData = faiqAreas.find(a => a.id === area.areaId);
    return area.categoryScores.flatMap(cat => {
      const categoryData = areaData?.categories.find(c => c.id === cat.categoryId);
      return cat.indicatorScores
        .filter(ind => ind.score === 0)
        .map(ind => {
          const indicator = categoryData?.indicators.find(i => i.id === ind.indicatorId);
          return {
            code: ind.indicatorId,
            name: indicator?.name || ind.indicatorId,
            area: areaData?.name || area.areaId
          };
        });
    });
  });

  // ===== COVER PAGE =====
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO DE AVALIAÇÃO', 105, 90, { align: 'center' });
  doc.setFontSize(28);
  doc.text('FAIQ-S', 105, 110, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(clinicName, 105, 145, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }), 105, 165, { align: 'center' });
  
  doc.setFontSize(11);
  doc.text('Framework de Avaliação Institucional de Qualidade', 105, 235, { align: 'center' });
  doc.text('Avaliação Técnica e Científica', 105, 245, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 105, 280, { align: 'center' });

  // ===== 1. IDENTIFICAÇÃO DA ORGANIZAÇÃO =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('1. Identificação da Organização');
  
  const identData = [
    ['Nome da Instituição', clinicName],
    ['Data da Avaliação', format(assessment.assessmentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })],
    ['Consultora Responsável', assessment.assessorName],
    ['Escopo da Avaliação', 'Framework FAIQ-S - Avaliação Institucional Completa'],
    ['Classificação Obtida', assessment.classification === 'excelencia' ? 'Excelência' : 
      assessment.classification === 'qualidade' ? 'Qualidade' : 'Padrão']
  ];
  
  autoTable(doc, {
    startY: currentY,
    body: identData,
    theme: 'plain',
    styles: { 
      fontSize: 10, 
      cellPadding: 4,
      textColor: GRAY_DARK
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 55 },
      1: { cellWidth: 125 }
    }
  });
  
  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== 2. SUMÁRIO EXECUTIVO =====
  addSectionTitle('2. Sumário Executivo');
  
  // Overall maturity box
  doc.setFillColor(...GRAY_LIGHT);
  doc.rect(20, currentY, 170, 25, 'F');
  doc.setDrawColor(...PRIMARY_COLOR);
  doc.setLineWidth(0.5);
  doc.rect(20, currentY, 170, 25, 'S');
  
  doc.setTextColor(...GRAY_DARK);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Maturidade Geral da Organização', 25, currentY + 8);
  
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.text(`${assessment.overallPercentage.toFixed(1)}%`, 160, currentY + 10, { align: 'right' });
  
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_DARK);
  const classText = assessment.classification === 'excelencia' ? 'Excelência' : 
                    assessment.classification === 'qualidade' ? 'Qualidade' : 'Padrão';
  doc.text(`Classificação: ${classText}`, 25, currentY + 18);
  doc.text(`${assessment.totalScore.toFixed(1)} / ${assessment.maxScore} pontos`, 160, currentY + 18, { align: 'right' });
  
  currentY += 35;

  // Executive summary text
  const strongAreas = assessment.areaScores.filter(a => a.percentage >= 70).slice(0, 3);
  const weakAreas = assessment.areaScores.filter(a => a.percentage < 50).slice(0, 3);
  const moderateAreas = assessment.areaScores.filter(a => a.percentage >= 50 && a.percentage < 70).slice(0, 3);

  const maturityLevel = assessment.overallPercentage >= 70 ? 'avançada' :
                       assessment.overallPercentage >= 50 ? 'intermediária' : 'inicial';
  
  const areasWithMaturity = strongAreas.length;
  const areasNeedingImprovement = weakAreas.length;

  addBodyText(
    `A avaliação demonstra padrões de maturidade ${maturityLevel} em ${areasWithMaturity > 0 ? areasWithMaturity : 'poucas'} áreas estruturantes, ` +
    `com oportunidades estratégicas de fortalecimento em ${areasNeedingImprovement > 0 ? areasNeedingImprovement : 'algumas'} dimensões críticas.`
  );
  currentY += 5;

  // Strengths
  addSubsectionTitle('Principais Forças');
  if (strongAreas.length > 0) {
    strongAreas.forEach(area => {
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      addBullet(`${areaData?.name.replace(/^Área \d+: /, '')} - demonstra conformidade de ${area.percentage.toFixed(1)}%, indicando processos consolidados`);
    });
  } else {
    addBullet('Organização em fase de estruturação, com necessidade de consolidação de processos fundamentais');
  }
  currentY += 3;

  // Risks
  addSubsectionTitle('Principais Riscos');
  if (weakAreas.length > 0) {
    weakAreas.forEach(area => {
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      addBullet(`${areaData?.name.replace(/^Área \d+: /, '')} - conformidade de ${area.percentage.toFixed(1)}%, representando risco operacional e regulatório`);
    });
  } else {
    addBullet('Riscos controlados nas dimensões avaliadas, com oportunidades de elevação para excelência');
  }
  currentY += 3;

  // Strategic levers
  addSubsectionTitle('Alavancas Estratégicas de Impacto');
  if (moderateAreas.length > 0) {
    moderateAreas.forEach(area => {
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      addBullet(`${areaData?.name.replace(/^Área \d+: /, '')} - potencial de elevação através de estruturação direcionada`);
    });
  } else if (weakAreas.length > 0) {
    weakAreas.slice(0, 3).forEach(area => {
      const areaData = faiqAreas.find(a => a.id === area.areaId);
      addBullet(`${areaData?.name.replace(/^Área \d+: /, '')} - priorização para redução de risco e conformidade regulatória`);
    });
  } else {
    addBullet('Consolidar processos de excelência através de auditorias internas e ciclos de melhoria contínua');
    addBullet('Desenvolver cultura de inovação e benchmarking setorial');
    addBullet('Implementar dashboards de monitoramento em tempo real para todas as dimensões avaliadas');
  }
  currentY += 5;

  // Consolidated interpretation
  addSubsectionTitle('Interpretação Consolidada');
  const governanceLevel = assessment.overallPercentage >= 70 ? 'robusta' :
                         assessment.overallPercentage >= 50 ? 'em desenvolvimento' : 'incipiente';
  addBodyText(
    `A análise evidencia governança clínica ${governanceLevel}, com ${excellenceCount} indicadores ` +
    `em nível de excelência (${((excellenceCount/totalIndicators)*100).toFixed(1)}%) e ${standardCount} indicadores ` +
    `em nível padrão (${((standardCount/totalIndicators)*100).toFixed(1)}%). ` +
    `Os achados indicam ${criticalIndicators.length > 10 ? 'necessidade crítica' : criticalIndicators.length > 5 ? 'necessidade moderada' : 'baixa necessidade'} ` +
    `de intervenções corretivas imediatas, com foco em redução de variabilidade operacional e fortalecimento de controles internos.`
  );
  currentY += 10;

  // ===== 3. RESULTADO CONSOLIDADO =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('3. Resultado Consolidado');
  
  addBodyText(
    'Este bloco sintetiza o desempenho global, permitindo a visualização da distribuição entre níveis ' +
    'essenciais, intermediários e avançados conforme framework FAIQ-S.'
  );
  currentY += 5;

  // Distribution by category
  addSubsectionTitle('3.1. Distribuição por Categoria de Maturidade');
  
  const distributionData = [
    ['Padrão (nota 0)', `${standardCount} indicadores`, `${((standardCount/totalIndicators)*100).toFixed(1)}%`],
    ['Qualidade (nota 0,5)', `${qualityCount} indicadores`, `${((qualityCount/totalIndicators)*100).toFixed(1)}%`],
    ['Excelência (nota 1)', `${excellenceCount} indicadores`, `${((excellenceCount/totalIndicators)*100).toFixed(1)}%`]
  ];
  
  autoTable(doc, {
    startY: currentY,
    body: distributionData,
    theme: 'striped',
    headStyles: { fillColor: PRIMARY_COLOR },
    styles: { 
      fontSize: 10,
      cellPadding: 4
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 60 },
      2: { fontStyle: 'bold', cellWidth: 50, halign: 'right' }
    },
    alternateRowStyles: {
      fillColor: GRAY_LIGHT
    }
  });
  
  currentY = (doc as any).lastAutoTable.finalY + 15;

  // Distribution by area
  addSubsectionTitle('3.2. Desempenho por Área FAIQ-S');
  
  const areaTableData = assessment.areaScores.map((areaScore) => {
    const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
    return [
      areaData?.name.replace(/^Área \d+: /, '') || `Área ${areaScore.areaId}`,
      `${areaScore.totalScore.toFixed(1)} / ${areaScore.maxScore}`,
      `${areaScore.percentage.toFixed(1)}%`
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Área', 'Pontuação', 'Conformidade']],
    body: areaTableData,
    theme: 'striped',
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
      0: { cellWidth: 110 },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 35, halign: 'center', fontStyle: 'bold' }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== 4. ANÁLISES EXECUTIVAS POR ÁREA =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('4. Análises Executivas por Área');
  
  addBodyText(
    'As análises subsequentes detalham achados por área estruturante, identificando forças consolidadas, ' +
    'riscos operacionais e impactos clínicos diretos.'
  );
  currentY += 10;

  // For each area, generate executive analysis
  assessment.areaScores.forEach((areaScore, index) => {
    const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
    if (!areaData) return;

    checkPageBreak(60);

    // Area header with colored box
    const areaColor: [number, number, number] = areaScore.percentage >= 70 ? PRIMARY_COLOR :
                                                areaScore.percentage >= 50 ? GRAY_MEDIUM : ACCENT_COLOR;
    
    doc.setFillColor(...GRAY_LIGHT);
    doc.rect(20, currentY, 170, 12, 'F');
    doc.setDrawColor(...areaColor);
    doc.setLineWidth(0.8);
    doc.line(20, currentY, 20, currentY + 12);
    
    doc.setTextColor(...GRAY_DARK);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(areaData.name, 25, currentY + 8);
    doc.text(`${areaScore.percentage.toFixed(1)}%`, 185, currentY + 8, { align: 'right' });
    currentY += 18;

    // Description
    doc.setTextColor(...GRAY_DARK);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    addBodyText(areaData.description);
    currentY += 3;

    // Strengths
    const strongCategories = areaScore.categoryScores.filter(cat => cat.percentage >= 70);
    if (strongCategories.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      checkPageBreak(10);
      doc.text('Forças:', 20, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      strongCategories.forEach(cat => {
        const categoryData = areaData?.categories.find(c => c.id === cat.categoryId);
        addBullet(`${categoryData?.name || cat.categoryId} - conformidade de ${cat.percentage.toFixed(1)}%`);
      });
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      checkPageBreak(10);
      doc.text('Forças:', 20, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      addBullet('Área em estruturação, sem processos consolidados identificados');
    }
    currentY += 2;

    // Risks
    const weakCategories = areaScore.categoryScores.filter(cat => cat.percentage < 50);
    if (weakCategories.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      checkPageBreak(10);
      doc.text('Riscos:', 20, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      weakCategories.forEach(cat => {
        const categoryData = areaData?.categories.find(c => c.id === cat.categoryId);
        addBullet(`${categoryData?.name || cat.categoryId} - conformidade de ${cat.percentage.toFixed(1)}%, representando risco ${cat.percentage < 30 ? 'alto' : 'moderado'} para conformidade regulatória`);
      });
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      checkPageBreak(10);
      doc.text('Riscos:', 20, currentY);
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      addBullet('Riscos controlados nesta dimensão, com oportunidades de elevação para excelência');
    }
    currentY += 2;

    // Clinical and operational impact
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    checkPageBreak(10);
    doc.text('Impacto Clínico e Operacional:', 20, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    
    const impactLevel = areaScore.percentage >= 70 ? 'positivo' :
                       areaScore.percentage >= 50 ? 'moderado' : 'significativo';
    addBodyText(
      `As evidências observadas nesta área apresentam impacto ${impactLevel} na consistência da intervenção, ` +
      `segurança do processo assistencial e governança clínica. ` +
      `${areaScore.percentage < 50 ? 'Recomenda-se priorização estratégica para redução de variabilidade e fortalecimento de controles.' : ''}`,
      20
    );
    
    currentY += 8;
  });

  // ===== 5. TABELA COMPLETA DE INDICADORES =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('5. Tabela Completa de Indicadores');
  
  addBodyText(
    'Relação completa dos 240+ indicadores avaliados, incluindo código, categoria, classificação e nota atribuída. ' +
    'Notas possíveis: 0 (não atende), 0.5 (atende parcialmente), 1 (atende plenamente).'
  );
  currentY += 8;

  // Build complete indicator table
  const completeIndicatorData: any[] = [];
  
  assessment.areaScores.forEach(areaScore => {
    const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
    
    areaScore.categoryScores.forEach(catScore => {
      const categoryData = areaData?.categories.find(c => c.id === catScore.categoryId);
      
      catScore.indicatorScores.forEach(indScore => {
        const indicator = categoryData?.indicators.find(i => i.id === indScore.indicatorId);
        
        completeIndicatorData.push([
          indScore.indicatorId,
          categoryData?.name || catScore.categoryId,
          indicator?.name || indScore.indicatorId,
          indicator?.classification === 'excelencia' ? 'Excelência' :
            indicator?.classification === 'qualidade' ? 'Qualidade' : 'Padrão',
          indScore.score.toString()
        ]);
      });
    });
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Código', 'Categoria', 'Descrição', 'Classificação', 'Nota']],
    body: completeIndicatorData,
    theme: 'striped',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 7,
      cellPadding: 2
    },
    alternateRowStyles: {
      fillColor: GRAY_LIGHT
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 45 },
      2: { cellWidth: 85 },
      3: { cellWidth: 25 },
      4: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== 6. ANÁLISE QUALITATIVA DETALHADA =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('6. Análise Qualitativa Detalhada');

  // 6.1 SWOT Analysis
  addSubsectionTitle('6.1. Análise SWOT');
  
  // Use AI analysis if available, otherwise generate basic SWOT
  let swotStrengths = '';
  let swotWeaknesses = '';
  let swotOpportunities = '';
  let swotThreats = '';

  if (aiAnalysis) {
    swotStrengths = aiAnalysis.swot_strengths || '';
    swotWeaknesses = aiAnalysis.swot_weaknesses || '';
    swotOpportunities = aiAnalysis.swot_opportunities || '';
    swotThreats = aiAnalysis.swot_threats || '';
  } else {
    // Generate basic SWOT
    const strongAreasTop = assessment.areaScores.filter(a => a.percentage >= 70);
    swotStrengths = strongAreasTop.length > 0 
      ? strongAreasTop.map(a => {
          const areaData = faiqAreas.find(ad => ad.id === a.areaId);
          return `• ${areaData?.name.replace(/^Área \d+: /, '')} consolidada (${a.percentage.toFixed(1)}%)`;
        }).join('\n')
      : '• Organização em fase de estruturação\n• Oportunidade de construção de processos desde a base';

    const weakAreasTop = assessment.areaScores.filter(a => a.percentage < 50);
    swotWeaknesses = weakAreasTop.length > 0
      ? weakAreasTop.map(a => {
          const areaData = faiqAreas.find(ad => ad.id === a.areaId);
          return `• ${areaData?.name.replace(/^Área \d+: /, '')} com baixa conformidade (${a.percentage.toFixed(1)}%)`;
        }).join('\n')
      : '• Necessidade de evolução contínua para excelência\n• Padronização de processos já estruturados';

    swotOpportunities = '• Implementação de frameworks de governança clínica\n• Desenvolvimento de cultura de qualidade e compliance\n• Certificações e acreditações setoriais';
    
    swotThreats = criticalIndicators.length > 10 
      ? '• Riscos regulatórios significativos\n• Potencial de inconsistência no cuidado\n• Vulnerabilidade a auditorias externas'
      : '• Evolução das regulamentações setoriais\n• Competição por excelência no mercado\n• Necessidade de atualização contínua';
  }

  // SWOT Table (2x2 matrix)
  const swotData = [
    [
      { content: 'FORÇAS\n\n' + swotStrengths, styles: { fillColor: [200, 238, 220] as [number, number, number] } },
      { content: 'FRAQUEZAS\n\n' + swotWeaknesses, styles: { fillColor: [255, 226, 201] as [number, number, number] } }
    ],
    [
      { content: 'OPORTUNIDADES\n\n' + swotOpportunities, styles: { fillColor: [200, 238, 220] as [number, number, number] } },
      { content: 'AMEAÇAS\n\n' + swotThreats, styles: { fillColor: [255, 226, 201] as [number, number, number] } }
    ]
  ];

  autoTable(doc, {
    startY: currentY,
    body: swotData,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 6,
      valign: 'top',
      textColor: GRAY_DARK
    },
    columnStyles: {
      0: { cellWidth: 85 },
      1: { cellWidth: 85 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // 6.2 Risk Map
  checkPageBreak(40);
  addSubsectionTitle('6.2. Mapa de Riscos por Área');
  
  const riskMapData = assessment.areaScores.map(areaScore => {
    const areaData = faiqAreas.find(a => a.id === areaScore.areaId);
    const riskLevel = areaScore.percentage >= 70 ? 'Baixo' :
                     areaScore.percentage >= 50 ? 'Moderado' : 'Alto';
    const riskColor: [number, number, number] = areaScore.percentage >= 70 ? [200, 238, 220] :
                     areaScore.percentage >= 50 ? [255, 243, 205] : [255, 226, 201];
    
    return [
      areaData?.name.replace(/^Área \d+: /, '') || `Área ${areaScore.areaId}`,
      `${areaScore.percentage.toFixed(1)}%`,
      { content: riskLevel, styles: { fillColor: riskColor, fontStyle: 'bold' as const } }
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Área', 'Conformidade', 'Nível de Risco']],
    body: riskMapData,
    theme: 'grid',
    headStyles: {
      fillColor: PRIMARY_COLOR,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 35, halign: 'center' },
      2: { cellWidth: 35, halign: 'center' }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // 6.3 Clinical and Operational Consequences
  checkPageBreak(30);
  addSubsectionTitle('6.3. Consequências Clínicas e Operacionais');
  
  const criticalAreasCount = assessment.areaScores.filter(a => a.percentage < 50).length;
  const riskDescription = criticalAreasCount > 5 ? 'alto' :
                         criticalAreasCount > 2 ? 'moderado' : 'baixo';
  
  addBodyText(
    `As lacunas identificadas representam risco ${riskDescription} para segurança do paciente, ` +
    `continuidade de cuidado, conformidade regulatória e estabilidade operacional. ` +
    `${criticalIndicators.length} indicadores em nível crítico (nota 0) demandam atenção imediata, ` +
    `com potencial impacto em auditoria externa, processos de acreditação e governança clínica. ` +
    `${riskDescription === 'alto' ? 'Recomenda-se estruturação de plano de ação emergencial com acompanhamento executivo.' : ''}`
  );
  currentY += 10;

  // ===== 7. PLANO DE AÇÃO ESTRATÉGICO =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('7. Plano de Ação Estratégico');
  
  addBodyText(
    'Plano estruturado em quatro horizontes temporais, priorizando ações críticas, estruturais e de maturidade. ' +
    'Cada ação inclui objetivo, KPI, responsável, evidência esperada e critério de fechamento.'
  );
  currentY += 10;

  // Use AI action plans if available
  if (aiAnalysis && (aiAnalysis.action_plan_30_days || aiAnalysis.action_plan_90_days || aiAnalysis.action_plan_12_months)) {
    // 7.1 Critical (0-30 days)
    if (aiAnalysis.action_plan_30_days) {
      addSubsectionTitle('7.1. Horizonte Crítico (0-30 dias)');
      addBodyText(aiAnalysis.action_plan_30_days);
      currentY += 5;
    }

    // 7.2 Strategic (30-90 days)
    if (aiAnalysis.action_plan_90_days) {
      checkPageBreak(30);
      addSubsectionTitle('7.2. Horizonte Estratégico (30-90 dias)');
      addBodyText(aiAnalysis.action_plan_90_days);
      currentY += 5;
    }

    // 7.3 Maturity (90-180 days) - split from 12 months
    checkPageBreak(30);
    addSubsectionTitle('7.3. Horizonte de Maturidade (90-180 dias)');
    if (aiAnalysis.action_plan_12_months) {
      const firstHalf = aiAnalysis.action_plan_12_months.substring(0, Math.floor(aiAnalysis.action_plan_12_months.length / 2));
      addBodyText(firstHalf);
    } else {
      addBodyText('• Consolidar processos estruturados no horizonte anterior\n• Implementar auditorias internas periódicas\n• Desenvolver indicadores de qualidade e dashboards de acompanhamento');
    }
    currentY += 5;

    // 7.4 Excellence (180-360 days)
    checkPageBreak(30);
    addSubsectionTitle('7.4. Horizonte de Excelência (180-360 dias)');
    if (aiAnalysis.action_plan_12_months) {
      const secondHalf = aiAnalysis.action_plan_12_months.substring(Math.floor(aiAnalysis.action_plan_12_months.length / 2));
      addBodyText(secondHalf);
    } else {
      addBodyText('• Buscar certificações e acreditações setoriais\n• Implementar cultura de inovação e melhoria contínua\n• Desenvolver benchmarking com organizações de excelência');
    }
    currentY += 5;
  } else {
    // Generate basic action plan based on critical areas
    const criticalAreas = assessment.areaScores.filter(a => a.percentage < 40);
    const moderateAreas = assessment.areaScores.filter(a => a.percentage >= 40 && a.percentage < 60);

    // 7.1 Critical (0-30 days)
    addSubsectionTitle('7.1. Horizonte Crítico (0-30 dias)');
    if (criticalAreas.length > 0) {
      criticalAreas.slice(0, 3).forEach(area => {
        const areaData = faiqAreas.find(a => a.id === area.areaId);
        addBullet(
          `Objetivo: Estruturar processos fundamentais em ${areaData?.name.replace(/^Área \d+: /, '')}\n` +
          `  KPI: Elevar conformidade para mínimo 50%\n` +
          `  Responsável: Gestão Executiva\n` +
          `  Evidência: Documentação de processos básicos implementados\n` +
          `  Critério: Processos documentados e equipe treinada`
        );
      });
    } else {
      addBullet('Manter processos críticos sob monitoramento contínuo\nKPI: Manutenção de conformidade acima de 70%');
    }
    currentY += 5;

    // 7.2 Strategic (30-90 days)
    checkPageBreak(30);
    addSubsectionTitle('7.2. Horizonte Estratégico (30-90 dias)');
    if (moderateAreas.length > 0) {
      moderateAreas.slice(0, 3).forEach(area => {
        const areaData = faiqAreas.find(a => a.id === area.areaId);
        addBullet(
          `Objetivo: Consolidar estrutura em ${areaData?.name.replace(/^Área \d+: /, '')}\n` +
          `  KPI: Atingir conformidade mínima de 70%\n` +
          `  Responsável: Coordenação de Qualidade\n` +
          `  Evidência: Auditorias internas positivas\n` +
          `  Critério: Processos auditados e aprovados`
        );
      });
    } else {
      addBullet('Desenvolver diretrizes formais para áreas estruturadas\nKPI: 100% das áreas com procedimentos documentados');
    }
    currentY += 5;

    // 7.3 Maturity (90-180 days)
    checkPageBreak(30);
    addSubsectionTitle('7.3. Horizonte de Maturidade (90-180 dias)');
    addBullet(
      'Objetivo: Implementar sistema de gestão de qualidade integrado\n' +
      '  KPI: Dashboard operacional em todas as áreas\n' +
      '  Responsável: Comitê de Qualidade\n' +
      '  Evidência: Sistema de indicadores funcionando\n' +
      '  Critério: Dados coletados e analisados mensalmente'
    );
    currentY += 5;

    // 7.4 Excellence (180-360 days)
    checkPageBreak(30);
    addSubsectionTitle('7.4. Horizonte de Excelência (180-360 dias)');
    addBullet(
      'Objetivo: Buscar certificação de qualidade setorial\n' +
      '  KPI: Obter certificação ou acreditação reconhecida\n' +
      '  Responsável: Direção Executiva\n' +
      '  Evidência: Certificado emitido\n' +
      '  Critério: Auditoria externa aprovada'
    );
    currentY += 5;
  }

  // ===== 8. RECOMENDAÇÕES FINAIS =====
  doc.addPage();
  currentY = 25;
  
  addSectionTitle('8. Recomendações Finais');
  
  const recommendationText = aiAnalysis?.priority_recommendations ||
    'Recomenda-se consolidar processos estruturantes que elevem a qualidade clínica, fortaleçam a governança ' +
    'e reduzam variabilidade operacional. A priorização deve focar em:\n\n' +
    '• Estruturação imediata de áreas com conformidade abaixo de 50%, com acompanhamento executivo semanal;\n' +
    '• Desenvolvimento de cultura de qualidade e compliance através de treinamentos estruturados e comunicação institucional;\n' +
    '• Implementação de sistema de gestão integrado com indicadores de desempenho e dashboards de monitoramento;\n' +
    '• Estabelecimento de comitês de qualidade com reuniões periódicas e planos de ação documentados;\n' +
    '• Preparação para processos de certificação e acreditação setorial, alinhando práticas às melhores evidências disponíveis;\n' +
    '• Auditoria interna periódica para garantir sustentabilidade das melhorias implementadas.';

  addBodyText(recommendationText);
  currentY += 10;

  addBodyText(
    'A implementação dessas recomendações posicionará a organização em trajetória consistente de maturidade, ' +
    'reduzindo riscos clínicos e operacionais, fortalecendo conformidade regulatória e estabelecendo base sólida ' +
    'para excelência institucional.'
  );
  currentY += 15;

  // ===== 9. REFERÊNCIAS TÉCNICAS =====
  checkPageBreak(30);
  addSectionTitle('9. Referências Técnicas');
  
  addBodyText(
    'Este relatório se baseia exclusivamente em frameworks e documentos reconhecidos na área, ' +
    'apresentados de forma formal e alinhados às melhores práticas profissionais. ' +
    'A metodologia FAIQ-S utiliza critérios objetivos de avaliação, com indicadores baseados em ' +
    'evidências científicas, regulamentações setoriais e padrões internacionais de qualidade e excelência clínica.'
  );
  currentY += 10;

  // ===== FOOTER ON ALL PAGES =====
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_MEDIUM);
    if (i > 1) { // Skip footer on cover
      doc.text(
        `Relatório FAIQ-S - ${clinicName}`,
        20,
        285
      );
      doc.text(
        `Gerado em ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
        105,
        285,
        { align: 'center' }
      );
      doc.text(`Pág. ${i} de ${pageCount}`, 190, 285, { align: 'right' });
    }
  }

  // Save PDF
  const fileName = `Relatorio-FAIQ-${clinicName.replace(/\s+/g, '-')}-${format(assessment.assessmentDate, 'yyyy-MM-dd')}.pdf`;
  doc.save(fileName);
};

// ===== COMPARATIVE REPORT =====
export const generateComparativePDF = (
  assessments: Assessment[],
  title: string = 'Relatório Comparativo FAIQ-S'
) => {
  const doc = new jsPDF();
  
  // Cover
  doc.setFillColor(...PRIMARY_COLOR);
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('RELATÓRIO COMPARATIVO', 105, 100, { align: 'center' });
  doc.setFontSize(24);
  doc.text('FAIQ-S', 105, 120, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`${assessments.length} Avaliações Analisadas`, 105, 150, { align: 'center' });
  doc.text(`Gerado em ${format(new Date(), "dd/MM/yyyy", { locale: ptBR })}`, 105, 165, { align: 'center' });
  
  // Page 2 - Comparative table
  doc.addPage();
  let currentY = 25;
  
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Análise Comparativa de Desempenho', 20, currentY);
  currentY += 15;
  
  // Average
  const avgScore = assessments.reduce((sum, a) => sum + a.overallPercentage, 0) / assessments.length;
  doc.setFillColor(...GRAY_LIGHT);
  doc.rect(20, currentY, 170, 15, 'F');
  doc.setTextColor(...GRAY_DARK);
  doc.setFontSize(12);
  doc.text(`Média Geral de Conformidade: ${avgScore.toFixed(1)}%`, 25, currentY + 10);
  currentY += 25;
  
  // Comparative table
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
    startY: currentY,
    head: [['Posição', 'Instituição', 'Data', 'Conformidade', 'Classificação']],
    body: tableData,
    theme: 'striped',
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
      0: { cellWidth: 25, halign: 'center' },
      1: { cellWidth: 70 },
      2: { cellWidth: 30, halign: 'center' },
      3: { cellWidth: 30, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 35, halign: 'center' }
    }
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_MEDIUM);
    if (i > 1) {
      doc.text(`Relatório Comparativo FAIQ-S`, 105, 285, { align: 'center' });
      doc.text(`Pág. ${i} de ${pageCount}`, 190, 285, { align: 'right' });
    }
  }
  
  doc.save(`Relatorio-Comparativo-FAIQ-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
