import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface HealthyRatingOption {
  value: string;
  label: string;
}

const entryOptions: HealthyRatingOption[] = [
  { label: "0 - Healthy", value: "0" },
  { label: "1 - Low Risk", value: "1" },
  { label: "2 - High Risk", value: "2" },
  { label: "3 - Critical Risk", value: "3" },
];

export const HealthCheckInput = ({ value, setValue }: Props) => {
  return (
    <>
      <Select
        label="Healh Check Rating (0-3)"
        fullWidth
        value={value}
        onChange={(event: SelectChangeEvent<string>) => {
          setValue(event.target.value);
        }}
      >
        {entryOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
