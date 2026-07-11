import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(5, "description is required"),
  date: z.iso.date(),
  specialist: z.string().min(1, "specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z
    .object({
      date: z.string(),
      criteria: z.string(),
    })
    .optional(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "employer name is required"),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Entry = z.infer<typeof EntrySchema>;

export const NewPatientSchema = z.object({
  name: z.string().min(1, "name is required"),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(1, "ssn is required"),
  gender: z.enum(Gender),
  occupation: z.string().min(1, "occupation is required"),
  entries: z.array(EntrySchema).default([]),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
