import express from "express";
const app = express();
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";

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

  return res.json({ weight: weight, height: height, bmi: result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
