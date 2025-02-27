import { z } from 'zod';
import { studentSchema } from './StudentSchema';
import { certificateTemplateSchema } from './CertificateTemplateSchema';

export const registerEntrySchema = z.object({
    id: z.number(),
    studentSerialNumber: z.number(),
    dateOfIssue: z.date(),
    reason: z.string(),
    reviewed: z.boolean(),
    accepted: z.boolean(),
    selectedTemplateId: z.number().nullable(),
    student: studentSchema,
    selectedTempalte: certificateTemplateSchema
})

export type RegisterEntry = z.infer<typeof registerEntrySchema>;