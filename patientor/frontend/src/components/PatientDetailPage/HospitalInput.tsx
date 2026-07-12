import { TextField } from "@mui/material";
import { Discharge } from "../../types";

interface Props {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

export const HospiatlInput = ({ discharge, setDischarge }: Props) => {
  return (
    <>
      <TextField
        type="date"
        label="discharge date"
        fullWidth
        value={discharge.date}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={({ target }) =>
          setDischarge({ ...discharge, date: target.value })
        }
      />
      <TextField
        label="discharge criteria"
        placeholder="input a criteria"
        fullWidth
        value={discharge.criteria}
        onChange={({ target }) =>
          setDischarge({ ...discharge, criteria: target.value })
        }
      />
    </>
  );
};
