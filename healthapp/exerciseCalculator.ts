interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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
    ratingDescription = "you need to put in more effort";
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
