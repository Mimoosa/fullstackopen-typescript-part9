import type { Diagnosis, HealthCheckEntry } from "../../types.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const HealthCheckHeart = ({ rating }: { rating: number }) => {
  const color = {
    0: "green",
    1: "yellow",
    2: "orange",
    3: "red",
  }[rating];

  return <FavoriteIcon style={{ color }} />;
};

export const HealthCheckDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        paddingLeft: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <p>
        {entry.date} <MedicalInformationIcon />
      </p>
      <p>{entry.description}</p>
      <HealthCheckHeart rating={entry.healthCheckRating} />
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
