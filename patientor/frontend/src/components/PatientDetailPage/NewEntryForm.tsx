import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import {
  EntryFormValues,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from "../../types";
import { Alert } from "@mui/material";
import { HealthCheckInput } from "./HealthCheckInput.tsx";
import { OccupationalHealthcareInput } from "./OccupationalHealthcareInput.tsx";
import { HospiatlInput } from "./HospitalInput.tsx";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error: string | undefined;
}

interface EntryOption {
  value: string;
  label: string;
}

const entryOptions: EntryOption[] = [
  { label: "Health Check", value: "HealthCheck" },
  { label: "Occupational Healthcare", value: "OccupationalHealthcare" },
  { label: "Hospital", value: "Hospital" },
];

export const NewEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDiscription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [type, setType] = useState("HealthCheck");
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
        return onSubmit({
          date,
          description,
          specialist,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter((code) => code.length > 0),
          type: "HealthCheck",
        });
      case "OccupationalHealthcare":
        if (sickLeave) {
          return onSubmit({
            date,
            description,
            specialist,
            employerName: employerName,
            sickLeave: sickLeave,
            diagnosisCodes: diagnosisCodes
              .split(",")
              .map((code) => code.trim())
              .filter((code) => code.length > 0),
            type: "OccupationalHealthcare",
          });
        } else {
          return onSubmit({
            date,
            description,
            specialist,
            employerName: employerName,
            diagnosisCodes: diagnosisCodes
              .split(",")
              .map((code) => code.trim())
              .filter((code) => code.length > 0),
            type: "OccupationalHealthcare",
          });
        }
      case "Hospital":
        return onSubmit({
          date,
          description,
          specialist,
          discharge: discharge,
          diagnosisCodes: diagnosisCodes
            .split(",")
            .map((code) => code.trim())
            .filter((code) => code.length > 0),
          type: "Hospital",
        });
    }
  };

  return (
    <div>
      <h2>New Entry</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <InputLabel sx={{ marginTop: 2.5 }}>Entry type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={type}
          onChange={(event: SelectChangeEvent<string>) => {
            setType(event.target.value);
          }}
        >
          {entryOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="date"
          label="entry date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          placeholder="write a description"
          fullWidth
          value={description}
          onChange={({ target }) => setDiscription(target.value)}
        />
        <TextField
          label="Specialist"
          placeholder="input a specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {type === "HealthCheck" && (
          <HealthCheckInput
            value={healthCheckRating}
            setValue={setHealthCheckRating}
          />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalHealthcareInput
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}
        {type === "Hospital" && (
          <HospiatlInput discharge={discharge} setDischarge={setDischarge} />
        )}
        <TextField
          label="Diagnosis Code"
          placeholder="Diagnosis Code (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
