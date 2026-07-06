import { isNotNumber } from "./utils.ts";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: number[],
  target: number,
): ExerciseResult => {
  const average =
    exerciseHours.reduce((acc, cur) => acc + cur, 0) / exerciseHours.length;
  let rating;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent, you reached your target";
  } else if (average / target > 0.7) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  const result = {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((h) => h > 0).length,
    success: rating === 3,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };

  return result;
};

interface ParsedResults {
  array: number[];
  target: number;
}

const parseArguments = (args: string[]): ParsedResults => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const slicedArgs = args.slice(2);

  if (slicedArgs.filter((arg) => isNotNumber(arg)).length === 0) {
    const numbers = slicedArgs.map((arg) => Number(arg));
    return {
      array: numbers.slice(1),
      target: numbers[0],
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { array, target } = parseArguments(process.argv);
  console.log(calculateExercises(array, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
