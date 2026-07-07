/*
import { type NewPatientEntry, NewPatientSchema } from "./types.ts";


const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDateOfBirth = (date: string): boolean => {
  const parsed = Date.parse(date);

  if (isNaN(parsed)) return false;

  const now = Date.now();
  if (parsed > now) return false;

  return true;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDateOfBirth(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};



const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

export default parseNewPatientEntry;
*/
