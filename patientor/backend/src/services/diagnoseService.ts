import diagnoseData from "../../data/diagnoses.ts";
import type { Diagnose } from "../types.ts";

const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
