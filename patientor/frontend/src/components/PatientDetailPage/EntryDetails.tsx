import type { Entry, Diagnosis } from "../../types.ts";
import { HealthCheckDetails } from "./HealthCheckDetails.tsx";
import { OccupationalHealthcareDetails } from "./OccupationalHealthcareDetails.tsx";
import { HospitalDetails } from "./HospitalDetails.tsx";
import { useState, useEffect } from "react";
import diagnoseService from "../../services/diagnoses.ts";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const res = await diagnoseService.getAll();
      setDiagnoses(res);
    };
    fetchDiagnoses();
  }, []);

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareDetails entry={entry} diagnoses={diagnoses} />
      );
    case "Hospital":
      return <HospitalDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};
