export interface RepositoryImage {
    SetPatientImageProfile(image: string, patientEmail : string): Promise<string>;
    GetPatientImageProfile(patientEmail: string): Promise<string>;
    GetProfessionalImageProfile(professionalEmail: string): Promise<string>;
    SetProfessionalImageProfile(image: string, professionalEmail : string): Promise<string>;
}