import { z } from 'zod';

export const assessmentFormSchema = z.object({
  selectedClinic: z.string()
    .min(1, 'Selecione uma clínica')
    .uuid('Clínica inválida'),
  assessorName: z.string()
    .min(2, 'Nome do avaliador deve ter no mínimo 2 caracteres')
    .max(200, 'Nome do avaliador deve ter no máximo 200 caracteres')
    .trim(),
  observations: z.string()
    .max(5000, 'Observações devem ter no máximo 5000 caracteres')
    .trim()
    .optional()
    .or(z.literal(''))
});

export const indicatorScoreSchema = z.number()
  .min(0, 'Pontuação mínima é 0')
  .max(1, 'Pontuação máxima é 1')
  .refine((val) => val === 0 || val === 0.5 || val === 1, {
    message: 'Pontuação deve ser 0, 0.5 ou 1'
  });

export type AssessmentFormData = z.infer<typeof assessmentFormSchema>;
