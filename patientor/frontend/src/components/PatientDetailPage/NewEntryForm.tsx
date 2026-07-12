import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  OutlinedInput,
  Chip,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

interface DiagnosisOption {
  value: string;
  label: string;
}

const diagnosisOptions: DiagnosisOption[] = [
  { value: "M24.2", label: "Disorder of ligament" },
  { value: "M51.2", label: "Other specified intervertebral disc displacement" },
  {
    value: "S03.5",
    label:
      "Sprain and strain of joints and ligaments of other and unspecified parts of head",
  },
  {
    value: "J10.1",
    label:
      "Influenza with other respiratory manifestations, other influenza virus codeentified",
  },
  {
    value: "J06.9",
    label: "Acute upper respiratory infection, unspecified",
  },
  { value: "Z57.1", label: "Occupational exposure to radiation" },
  { value: "N30.0", label: "Acute cystitis" },
  { value: "H54.7", label: "Unspecified visual loss" },
  { value: "J03.0", label: "Streptococcal tonsillitis" },
  { value: "L60.1", label: "Onycholysis" },
  { value: "Z74.3", label: "Need for continuous supervision" },
  { value: "L20", label: "Atopic dermatitis" },
  { value: "F43.2", label: "Adjustment disorders" },
  { value: "S62.5", label: "Fracture of thumb" },
  { value: "H35.29", label: "Other proliferative retinopathy" },
];

export const NewEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDiscription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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
          diagnosisCodes: diagnosisCodes,
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
            diagnosisCodes: diagnosisCodes,
            type: "OccupationalHealthcare",
          });
        } else {
          return onSubmit({
            date,
            description,
            specialist,
            employerName: employerName,
            diagnosisCodes: diagnosisCodes,
            type: "OccupationalHealthcare",
          });
        }
      case "Hospital":
        return onSubmit({
          date,
          description,
          specialist,
          discharge: discharge,
          diagnosisCodes: diagnosisCodes,
          type: "Hospital",
        });
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
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
          label="entry date*"
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
          label="Description*"
          placeholder="write a description"
          fullWidth
          value={description}
          onChange={({ target }) => setDiscription(target.value)}
        />
        <TextField
          label="Specialist*"
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
        <div>
          <InputLabel id="demo-multiple-chip-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Diagnosis Codes"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {diagnosisOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value} — {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>

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
