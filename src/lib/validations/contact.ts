import { z } from 'zod';

// Phone regex for Brazilian format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  email: z.string()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .trim()
    .toLowerCase(),
  phone: z.string()
    .regex(phoneRegex, 'Formato inválido. Use: (11) 99999-9999')
    .trim(),
  institution: z.string()
    .min(2, 'Nome da instituição é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres')
    .trim(),
  message: z.string()
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres')
    .trim()
    .optional()
    .or(z.literal(''))
});

export type ContactFormData = z.infer<typeof contactSchema>;
