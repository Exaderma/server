export interface RepositoryImage {
    SetPatientImageProfile(image: string, patientEmail : string): Promise<string>;
    GetPatientImageProfile(patientEmail: string): Promise<string>;
}