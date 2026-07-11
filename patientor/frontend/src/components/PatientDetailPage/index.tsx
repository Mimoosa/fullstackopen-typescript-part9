import { Patient, EntryFormValues } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { EntryDetails } from "./EntryDetails.tsx";
import { Button } from "@mui/material";
import { NewEntryForm } from "./NewEntryForm";
import axios from "axios";

const GenderIcon = ({ gender }: { gender: string | undefined }) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const PatientDetailPage = ({ patients, setPatients }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await patientService.getPatientDetails(id);
      setPatient(res);
    };
    fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: EntryFormValues) => {
    const id = patient?.id;
    try {
      const updatedPatient = await patientService.addNewEntry(id, values);
      setPatients(patients.map((p) => (p.id === id ? updatedPatient : p)));
      setPatient(updatedPatient);
      setIsOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const backendError = e.response?.data;

        if (backendError?.error) {
          const issues: unknown = backendError.error;

          if (Array.isArray(issues)) {
            const formatted = issues
              .map((issue) => {
                if (
                  typeof issue === "object" &&
                  issue !== null &&
                  "path" in issue &&
                  "message" in issue &&
                  typeof (issue as { path: unknown }).path === "string" &&
                  typeof (issue as { message: unknown }).message === "string"
                ) {
                  const i = issue as { path: string; message: string };
                  return `${i.path}: ${i.message}`;
                }
                return "Invalid error format";
              })
              .join("\n");

            setError(formatted);
            return;
          }

          setError("Invalid Zod error format");
          return;
        }

        if (typeof backendError === "string") {
          setError(backendError);
          return;
        }
        setError(e.message);
        return;
      }

      console.error("Unknown error", e);
      setError("Unknown error");
    }
  };

  return (
    <>
      <h2>
        {patient?.name} <GenderIcon gender={patient?.gender} />
      </h2>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>date of birth: {patient?.dateOfBirth}</p>
      <h3>entries</h3>
      {patient?.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      {isOpen === false ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          ADD NEW ENTRY
        </Button>
      ) : (
        <NewEntryForm
          onCancel={() => setIsOpen(!isOpen)}
          onSubmit={submitNewEntry}
          error={error}
        />
      )}
    </>
  );
};
