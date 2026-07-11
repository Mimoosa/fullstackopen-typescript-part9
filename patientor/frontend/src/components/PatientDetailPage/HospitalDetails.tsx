import type { HospitalEntry, Diagnosis } from "../../types.ts";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const HospitalDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
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
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
          </li>
        ))}
      </ul>
      {entry.discharge && (
        <div>
          <p>discharge date: {entry.discharge.date}</p>{" "}
          <p>discharge criteria: {entry.discharge.criteria}</p>
        </div>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};
