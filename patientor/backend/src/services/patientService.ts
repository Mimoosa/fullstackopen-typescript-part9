import patients from "../../data/patients.ts";
import type {
  NonSensitivePatientEntry,
  NewPatientEntry,
  Patient,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id = uuid();
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const newPatientEntry: Patient = {
    id: id,
    ...patient,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export default {
  getNonSensitivePatientEntries,
  addPatient,
  findById,
};
