import { RepositoryImage } from "./domain";

export async function resolverSetPatientImageProfile(
  image: RepositoryImage,
  data: string,
  patientEmail: string,
): Promise<string> {
  return image.SetPatientImageProfile(data, patientEmail);
}

export async function resolverGetPatientImageProfile(
  image: RepositoryImage,
  patientEmail: string,
  id_patient?: number,
): Promise<string> {
  return image.GetPatientImageProfile(patientEmail, id_patient);
}

export async function resolverGetProfessionalImageProfile(
  image: RepositoryImage,
  professionalEmail: string,
  id_professional?: number,
): Promise<string> {
  return image.GetProfessionalImageProfile(professionalEmail, id_professional);
}

export async function resolverSetProfessionalImageProfile(
  image: RepositoryImage,
  data: string,
  professionalEmail: string,
): Promise<string> {
  return image.SetProfessionalImageProfile(data, professionalEmail);
}

export async function resolverSetImageGallery(
  image: RepositoryImage,
  data: string,
  patientEmail: string,
  id_patient?: number,
): Promise<string> {
  return image.SetImageGallery(data, patientEmail, id_patient);
}

export async function resolverGetImageGallery(
  image: RepositoryImage,
  patientEmail: string,
  id_patient?: number,
): Promise<{data : string, id: number}[]> {
  return image.GetImageGallery(patientEmail, id_patient);
}

export async function resolverGetAllFolder(
  image: RepositoryImage,
  professionalEmail: string,
): Promise<{id: number, name: string, data: {image: string}[]}[]> {
  return image.GetAllFolder(professionalEmail);
}

export async function resolverRemoveFolder(
  image: RepositoryImage,
  professionalEmail: string,
  id_folder: number,
): Promise<string> {
  return image.removeFolder(professionalEmail, id_folder);
}

export async function resolverRemoveImages(
  image: RepositoryImage,
  professionalEmail: string,
  id_folder: number,
  id_image: number[],
): Promise<string> {
  return image.removeImages(professionalEmail, id_folder, id_image);
}

export async function resolverRemoveImageGallery(
  image: RepositoryImage,
  patientEmail: string,
  id_image: number,
  id_patient?: number,
): Promise<string> {
  return image.removeImageGallery(patientEmail, id_image, id_patient);
}
