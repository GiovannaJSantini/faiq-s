import { z } from 'zod';

// Phone regex for Brazilian format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const clinicSchema = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres')
    .trim(),
  location: z.string()
    .min(1, 'Localização é obrigatória')
    .max(200, 'Localização deve ter no máximo 200 caracteres')
    .trim(),
  type: z.enum(['especializada', 'geral', 'hospital', 'consultorio', 'centro_reabilitacao'], {
    errorMap: () => ({ message: 'Tipo de clínica inválido' })
  }),
  phone: z.string()
    .trim()
    .transform((val) => val || undefined)
    .refine((val) => !val || phoneRegex.test(val), {
      message: 'Formato inválido. Use: (11) 99999-9999'
    })
    .optional(),
  email: z.string()
    .trim()
    .transform((val) => val || undefined)
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: 'Email inválido'
    })
    .refine((val) => !val || val.length <= 255, {
      message: 'Email deve ter no máximo 255 caracteres'
    })
    .optional(),
  responsible_name: z.string()
    .max(200, 'Nome do responsável deve ter no máximo 200 caracteres')
    .trim()
    .transform((val) => val || undefined)
    .optional(),
  responsible_title: z.string()
    .max(200, 'Cargo do responsável deve ter no máximo 200 caracteres')
    .trim()
    .transform((val) => val || undefined)
    .optional()
});

export type ClinicFormData = z.infer<typeof clinicSchema>;
