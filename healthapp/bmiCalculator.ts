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

console.log(calculateBmi(180, 74));
