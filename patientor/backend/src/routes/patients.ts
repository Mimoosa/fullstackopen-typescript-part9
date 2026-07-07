import express, { type Response } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatientEntry } from "../types.ts";
import parseNewPatientEntry from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitivePatientEntries();
  res.send(data);
});

router.get("/:id", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    return res.sendStatus(404);
  }
  return res.send(patient);
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = parseNewPatientEntry(req.body as unknown);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
