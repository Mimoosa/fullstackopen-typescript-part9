export const isNotNumber = (argument: unknown): boolean => {
  if (typeof argument !== "string" && typeof argument !== "number") {
    return true;
  }
  return isNaN(Number(argument));
};
