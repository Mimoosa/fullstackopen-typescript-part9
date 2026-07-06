import express from "express";
const app = express();
import { isNotNumber } from "./utils.ts";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const h = Number(height);
  const w = Number(weight);

  const result = calculateBmi(h, w);

  return res.json({ weight: w, height: h, bmi: result });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({
      error: "parameters missing",
    });
  }
  const exercises: unknown = daily_exercises;

  if (!Array.isArray(exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  if (
    exercises.filter((arg) => isNotNumber(arg)).length !== 0 ||
    isNotNumber(target)
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(
    exercises.map((arg) => Number(arg)),
    Number(target),
  );

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
