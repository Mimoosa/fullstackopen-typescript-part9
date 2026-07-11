import express, { type Request, type Response } from "express";
import patientService from "../services/patientService.ts";
import {
  type NonSensitivePatientEntry,
  type NewPatientEntry,
  type Patient,
  type NewEntry,
} from "../types.ts";
import {
  newPatientParser,
  errorMiddleware,
  newEntryParser,
} from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  const data = patientService.getNonSensitivePatientEntries();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    return res.sendStatus(404);
  }
  return res.send(patient);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    console.log("here?");
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.post(
  "/:id",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>) => {
    const patient = patientService.findById(req.params.id);

    if (!patient) {
      return res.sendStatus(404);
    }

    const addedEntry = patientService.updatePatient(req.body, patient);
    return res.json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
