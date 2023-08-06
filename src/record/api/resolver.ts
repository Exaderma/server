import { RepositoryRecord } from "./domain";

export async function resolverNewRecord(
  record: RepositoryRecord,
  description: string,
  type: string,
  patientEmail: string,
  doctorEmail: string,
): Promise<string> {
  return record.NewRecord(description, type, patientEmail, doctorEmail);
}

export async function resolverGetRecord(
  record: RepositoryRecord,
  patientEmail: string,
  doctorEmail: string,
): Promise<any> {
  return record.GetRecord(patientEmail, doctorEmail);
}

export async function resolverUpdateRecord(
  record: RepositoryRecord,
  description: string,
  type: string,
  patientEmail: string,
  doctorEmail: string,
): Promise<string> {
  return record.UpdateRecord(description, type, patientEmail, doctorEmail);
}