import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / (height / 100) ** 2;
  if (result < 18.5) {
    return "Underweight";
  } else if (result < 25) {
    return "Normal range";
  } else if (result < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
