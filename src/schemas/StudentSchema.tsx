import { z } from 'zod';

export const studentSchema = z.object({
    serialNumber: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    studyYear: z.number(),
    degreeType: z.number(),
    department: z.string()
})

export type Student = z.infer<typeof studentSchema>;
