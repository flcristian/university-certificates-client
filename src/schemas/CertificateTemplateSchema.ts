import { z } from 'zod';

export const certificateTemplateSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    active: z.boolean(),
})

export type CertificateTemplate = z.infer<typeof certificateTemplateSchema>;