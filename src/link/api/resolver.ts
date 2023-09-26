import { RepositoryLink } from "./domain";

export async function resolverLinkPatientToprofessionnal(
  link: RepositoryLink,
  code: number,
  patientEmail: string,
): Promise<string> {
  return link.LinkPatientToprofessionnal(code, patientEmail);
}

export async function resolverLinkprofessionnalToPatient(
  link: RepositoryLink,
  professionnalEmail: string,
  email: string,
): Promise<string> {
  return link.LinkprofessionnalToPatient(professionnalEmail, email);
}

export async function resolverGetLinkPatient(
  link: RepositoryLink,
  patientEmail: string,
): Promise<any> {
  return link.getLinkPatient(patientEmail);
}

export async function resolverGetLinkprofessionnal(
  link: RepositoryLink,
  professionnalEmail: string,
): Promise<any> {
  return link.getLinkprofessionnal(professionnalEmail);
}

export async function resolverRemoveLinkPatient(
  link: RepositoryLink,
  patientEmail: string,
  professionalEmail : string
): Promise<any> {
  return link.removeLinkPatient(patientEmail, professionalEmail);
}

export async function resolverRemoveLinkprofessionnal(
  link: RepositoryLink,
  professionnalEmail: string,
  patientEmail : string
): Promise<any> {
  return link.removeLinkprofessionnal(professionnalEmail, patientEmail);
}
