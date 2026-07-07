import express, { type Response } from "express";
import diagnoseService from "../services/diagnoseService.ts";
import type { Diagnose } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnose[]>) => {
  const data = diagnoseService.getDiagnoses();
  res.send(data);
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
