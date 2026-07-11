import { TextField, Grid, Button } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { HealthCheckFormValues, HealthCheckRating } from "../../types";
import { Alert } from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
  error: string | undefined;
}

export const NewEntryForm = ({ onCancel, onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDiscription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
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
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
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
        <TextField
          label="Healh Check Rating (0-3)"
          placeholder="input a rate (0-3)"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
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
