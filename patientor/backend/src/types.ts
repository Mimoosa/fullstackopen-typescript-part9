import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export const EntrySchema = z.object({});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
