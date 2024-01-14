import { RepositoryUpdateProfile } from "./domain";

// Patient

export async function resolverUpdatePatientFirstName(
  email: string,
  firstName: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updatePatientFirstName(email, firstName);
}

export async function resolverUpdatePatientLastName(
  email: string,
  lastName: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updatePatientLastName(email, lastName);
}

export async function resolverUpdatePatientEmail(
  email: string,
  newEmail: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updatePatientEmail(email, newEmail);
}

export async function resolverUpdatePatientPassword(
  email: string,
  password: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updatePatientPassword(email, password);
}

export async function resolverUpdatePatientPhone(
  email: string,
  phone: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updatePatientPhone(email, phone);
}

// Professional

export async function resolverUpdateProfessionalFirstName(
  email: string,
  firstName: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalFirstName(email, firstName);
}

export async function resolverUpdateProfessionalLastName(
  email: string,
  lastName: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalLastName(email, lastName);
}

export async function resolverUpdateProfessionalEmail(
  email: string,
  newEmail: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalEmail(email, newEmail);
}

export async function resolverUpdateProfessionalPassword(
  email: string,
  password: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalPassword(email, password);
}

export async function resolverUpdateProfessionalPhone(
  email: string,
  phone: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalPhone(email, phone);
}

export async function resolverUpdateProfessionalDepartment(
  email: string,
  department: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalDepartment(email, department);
}

export async function resolverUpdateProfessionalAddress(
  email: string,
  address: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateProfessionalAddress(email, address);
}

export async function resolverGetNotePatient(
  email: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.getNotePatient(email);
}

export async function resolverAddNotePatient(
  email: string,
  note: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.addNotePatient(email, note);
}

export async function resolverRemoveNotePatient(
  email: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.removeNotePatient(email);
}

export async function resolverUpdateNotePatient(
  email: string,
  note: string,
  updateProfile: RepositoryUpdateProfile,
): Promise<string> {
  return updateProfile.updateNotePatient(email, note);
}
