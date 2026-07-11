import diagnoses from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
