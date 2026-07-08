import { type CoursePart } from "../types.ts";

interface PartProps {
  part: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>
            {part.name} {part.exerciseCount}
          </p>
          <p style={{ fontStyle: "italic" }}>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>
            {part.name} {part.exerciseCount}
          </p>
          <p>{`project exercises ${part.groupProjectCount}`}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>
            {part.name} {part.exerciseCount}
          </p>
          <p style={{ fontStyle: "italic" }}>{part.description} </p>
          <p>{`submit to ${part.backgroundMaterial}`}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p style={{ fontWeight: "bold" }}>
            {part.name} {part.exerciseCount}
          </p>
          <p style={{ fontStyle: "italic" }}>{part.description} </p>
          <p>{`required skils: ${part.requirements.map((r) => r)}`}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};
