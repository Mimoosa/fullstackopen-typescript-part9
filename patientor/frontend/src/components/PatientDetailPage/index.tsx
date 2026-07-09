import { Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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

export const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await patientService.getPatientDetails(id);
      setPatient(res);
    };
    fetchPatient();
  }, [id]);

  return (
    <>
      <h1>
        {patient?.name} <GenderIcon gender={patient?.gender} />
      </h1>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>date of birth: {patient?.dateOfBirth}</p>
    </>
  );
};
