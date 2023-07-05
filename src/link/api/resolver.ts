import { RepositoryLink } from "./domain";

export async function resolverLinkPatientToDoctor(
  link: RepositoryLink,
): Promise<string> {
  return link.LinkPatientToDoctor("patientId", "doctorId");
}

export async function resolverLinkDoctorToPatient(
  link: RepositoryLink,
): Promise<string> {
  return link.LinkDoctorToPatient("doctorId", "patientId");
}
