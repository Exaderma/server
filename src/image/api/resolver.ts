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