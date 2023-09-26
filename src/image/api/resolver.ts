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
    ): Promise<string> {
        return image.GetPatientImageProfile(patientEmail);
    }

export async function resolverGetProfessionalImageProfile(
    image: RepositoryImage,
    professionalEmail: string,
    ): Promise<string> {
        return image.GetProfessionalImageProfile(professionalEmail);
    }

export async function resolverSetProfessionalImageProfile(
    image: RepositoryImage,
    data: string,
    professionalEmail: string,
    ): Promise<string> {
        return image.SetProfessionalImageProfile(data, professionalEmail);
    }