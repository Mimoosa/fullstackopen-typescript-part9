import { TextField } from "@mui/material";
import { SickLeave } from "../../types";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
}

export const OccupationalHealthcareInput = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props) => {
  return (
    <>
      <TextField
        label="Employer name*"
        placeholder="input a patient's name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        type="date"
        label="sick leave starting date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        fullWidth
        value={sickLeave.startDate}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, startDate: target.value })
        }
      />
      <TextField
        type="date"
        label="sick leave ending date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        fullWidth
        value={sickLeave.endDate}
        onChange={({ target }) =>
          setSickLeave({ ...sickLeave, endDate: target.value })
        }
      />
    </>
  );
};
