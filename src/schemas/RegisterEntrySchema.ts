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

export const denyRegisterEntryRequestSchema = z.object({
    id: z.number(),
    reviewed: z.boolean(),
    accepted: z.boolean(),
})

export const acceptRegisterEntryRequestSchema = z.object({
    id: z.number(),
    reviewed: z.boolean(),
    accepted: z.boolean(),
    selectedTemplateId: z.number()
})

export type RegisterEntry = z.infer<typeof registerEntrySchema>;
export type DenyRegisterEntryRequest = z.infer<typeof denyRegisterEntryRequestSchema>;
export type AcceptRegisterEntryRequest = z.infer<typeof acceptRegisterEntryRequestSchema>;