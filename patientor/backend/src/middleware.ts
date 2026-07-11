import { type Request, type Response, type NextFunction } from "express";
import { NewPatientSchema, NewEntrySchema } from "./types.ts";
import { z } from "zod";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    const detailed = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));

    return res.status(400).json({ error: detailed });
  } else {
    return next(error);
  }
};
