import { TextField } from "@mui/material";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const HealthCheckInput = ({ value, setValue }: Props) => {
  return (
    <TextField
      label="Healh Check Rating (0-3)"
      placeholder="input a rate (0-3)"
      fullWidth
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
