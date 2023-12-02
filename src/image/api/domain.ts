export type addImage = {
  data: string;
};

export interface RepositoryImage {
  SetPatientImageProfile(image: string, patientEmail: string): Promise<string>;
  GetPatientImageProfile(
    patientEmail: string,
    id_patient?: number,
  ): Promise<string>;
  GetProfessionalImageProfile(
    professionalEmail: string,
    id_professional?: number,
  ): Promise<string>;
  SetProfessionalImageProfile(
    image: string,
    professionalEmail: string,
  ): Promise<string>;
  SetImageGallery(
    image: string,
    patientEmail: string,
    id_patient?: number,
  ): Promise<string>;
  GetImageGallery(
    patientEmail: string,
    id_patient?: number,
  ): Promise<string[]>;
}
