import { RepositoryLink } from "./domain";

export async function resolverLinkPatientToDoctor(
  link: RepositoryLink,
  code: number,
  patientId: number,
): Promise<string> {
  return link.LinkPatientToDoctor(code, patientId);
}

export async function resolverLinkDoctorToPatient(
  link: RepositoryLink,
  doctorId: number,
  email: string,
): Promise<string> {
  return link.LinkDoctorToPatient(doctorId, email);
}

export async function resolverGetLinkPatient(
  link: RepositoryLink,
  patientId: number,
): Promise<any> {
  return link.getLinkPatient(patientId);
}

export async function resolverGetLinkDoctor(
  link: RepositoryLink,
  doctorId: number,
): Promise<any> {
  return link.getLinkDoctor(doctorId);
}
