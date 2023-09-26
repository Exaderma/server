import { RepositoryLink } from "./domain";

export async function resolverLinkPatientToDoctor(
  link: RepositoryLink,
  code: number,
  patientEmail: string,
): Promise<string> {
  return link.LinkPatientToDoctor(code, patientEmail);
}

export async function resolverLinkDoctorToPatient(
  link: RepositoryLink,
  doctorEmail: string,
  email: string,
): Promise<string> {
  return link.LinkDoctorToPatient(doctorEmail, email);
}

export async function resolverGetLinkPatient(
  link: RepositoryLink,
  patientEmail: string,
): Promise<any> {
  return link.getLinkPatient(patientEmail);
}

export async function resolverGetLinkDoctor(
  link: RepositoryLink,
  doctorEmail: string,
): Promise<any> {
  return link.getLinkDoctor(doctorEmail);
}

export async function resolverRemoveLinkPatient(
  link: RepositoryLink,
  patientEmail: string,
  professionalEmail : string
): Promise<any> {
  return link.removeLinkPatient(patientEmail, professionalEmail);
}

export async function resolverRemoveLinkDoctor(
  link: RepositoryLink,
  doctorEmail: string,
  patientEmail : string
): Promise<any> {
  return link.removeLinkDoctor(doctorEmail, patientEmail);
}
