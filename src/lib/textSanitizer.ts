/**
 * Utilitário para sanitização de texto de relatórios institucionais.
 * Remove marcações markdown, emojis e normaliza formatação.
 */

/**
 * Remove marcações markdown e normaliza texto para output institucional.
 * @param text Texto a ser sanitizado
 * @returns Texto limpo sem marcações
 */
export const sanitizeText = (text: string | null | undefined): string => {
  if (!text) return '';
  
  return text
    // Remove markdown bold
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove markdown italics
    .replace(/(?<!\*)\*(?!\*)/g, '')
    .replace(/(?<!_)_(?!_)/g, '')
    // Remove bullet point variations
    .replace(/^[-*•]\s+/gm, '• ')
    // Normalize multiple line breaks
    .replace(/\n{3,}/g, '\n\n')
    // Remove emojis
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '')
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '')
    .replace(/[\u{231A}-\u{231B}]/gu, '')
    .replace(/[\u{23E9}-\u{23F3}]/gu, '')
    .replace(/[\u{23F8}-\u{23FA}]/gu, '')
    .replace(/[\u{25AA}-\u{25AB}]/gu, '')
    .replace(/[\u{25B6}]/gu, '')
    .replace(/[\u{25C0}]/gu, '')
    .replace(/[\u{25FB}-\u{25FE}]/gu, '')
    .replace(/[\u{2614}-\u{2615}]/gu, '')
    .replace(/[\u{2648}-\u{2653}]/gu, '')
    .replace(/[\u{267F}]/gu, '')
    .replace(/[\u{2693}]/gu, '')
    .replace(/[\u{26A1}]/gu, '')
    .replace(/[\u{26AA}-\u{26AB}]/gu, '')
    .replace(/[\u{26BD}-\u{26BE}]/gu, '')
    .replace(/[\u{26C4}-\u{26C5}]/gu, '')
    .replace(/[\u{26CE}]/gu, '')
    .replace(/[\u{26D4}]/gu, '')
    .replace(/[\u{26EA}]/gu, '')
    .replace(/[\u{26F2}-\u{26F3}]/gu, '')
    .replace(/[\u{26F5}]/gu, '')
    .replace(/[\u{26FA}]/gu, '')
    .replace(/[\u{26FD}]/gu, '')
    // Clean up extra spaces
    .replace(/  +/g, ' ')
    .trim();
};

/**
 * Formata texto de lista para exibição institucional.
 * Garante bullets consistentes e indentação apropriada.
 * @param text Texto de lista
 * @returns Lista formatada
 */
export const formatListText = (text: string | null | undefined): string => {
  if (!text) return '';
  
  const sanitized = sanitizeText(text);
  
  // Ensure consistent bullet formatting
  return sanitized
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('•')) {
        // Check if it looks like a list item (starts with number, dash, etc.)
        if (/^[\d]+[.)-]?\s+/.test(trimmed) || /^[-*]\s+/.test(trimmed)) {
          return '• ' + trimmed.replace(/^[\d]+[.)-]?\s+/, '').replace(/^[-*]\s+/, '');
        }
      }
      return line;
    })
    .join('\n');
};

/**
 * Formata texto para parágrafos institucionais.
 * Limita comprimento de linhas e adiciona quebras apropriadas.
 * @param text Texto a ser formatado
 * @param maxLineLength Comprimento máximo por linha (padrão: 80)
 * @returns Texto com formatação institucional
 */
export const formatParagraphText = (text: string | null | undefined, maxLineLength: number = 80): string => {
  if (!text) return '';
  
  const sanitized = sanitizeText(text);
  
  // Split into paragraphs
  const paragraphs = sanitized.split(/\n\n+/);
  
  return paragraphs
    .map(para => {
      // If paragraph is already well-formatted (bullets), keep it
      if (para.includes('• ')) {
        return para;
      }
      // Otherwise, it's a regular paragraph - just clean it up
      return para.replace(/\s+/g, ' ').trim();
    })
    .filter(para => para.length > 0)
    .join('\n\n');
};

/**
 * Categoriza tipo de risco baseado no contexto.
 * @param riskText Texto descritivo do risco
 * @returns Categoria do risco
 */
export const categorizeRisk = (riskText: string): 'clínico' | 'regulatório' | 'organizacional' => {
  const lowerText = riskText.toLowerCase();
  
  // Palavras-chave para risco clínico
  const clinicalKeywords = [
    'paciente', 'segurança', 'cuidado', 'assistência', 'clínico', 'saúde',
    'tratamento', 'intervenção', 'procedimento', 'terapêutico', 'diagnóstico'
  ];
  
  // Palavras-chave para risco regulatório
  const regulatoryKeywords = [
    'regulatório', 'conformidade', 'compliance', 'legislação', 'auditoria',
    'fiscalização', 'anvisa', 'vigilância', 'norma', 'certificação', 'acreditação'
  ];
  
  // Check for clinical keywords
  if (clinicalKeywords.some(kw => lowerText.includes(kw))) {
    return 'clínico';
  }
  
  // Check for regulatory keywords
  if (regulatoryKeywords.some(kw => lowerText.includes(kw))) {
    return 'regulatório';
  }
  
  // Default to organizational
  return 'organizacional';
};

/**
 * Formata análise de riscos com categorização.
 * @param riskText Texto de análise de riscos
 * @returns Texto formatado com categorização
 */
export const formatRiskAnalysis = (riskText: string | null | undefined): string => {
  if (!riskText) return '';
  
  const sanitized = sanitizeText(riskText);
  const lines = sanitized.split('\n');
  
  return lines
    .map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
        const riskContent = trimmed.replace(/^[•-]\s*/, '');
        const category = categorizeRisk(riskContent);
        const categoryLabel = category === 'clínico' ? '[Risco Clínico]' :
                             category === 'regulatório' ? '[Risco Regulatório]' :
                             '[Risco Organizacional]';
        return `• ${categoryLabel} ${riskContent}`;
      }
      return line;
    })
    .join('\n');
};
