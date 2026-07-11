import type { OccupationalHealthcareEntry, Diagnosis } from "../../types.ts";
import WorkIcon from "@mui/icons-material/Work";

export const OccupationalHealthcareDetails = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
          </li>
        ))}
      </ul>
      {entry.sickLeave && (
        <div>
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
