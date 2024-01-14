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
  ): Promise<{data : string, id: number}[]>;
  GetAllFolder(
    professionalEmail: string
  ): Promise<{id: number, name: string, data: {image: string}[]}[]>;
  removeImageGallery(
    patientEmail: string,
    id_image: number,
    id_patient?: number,
  ): Promise<string>;
  removeFolder(
    professionalEmail: string,
    id_folder: number,
  ): Promise<string>;
  removeImages(
    professionalEmail: string,
    id_folder: number,
    id_image: number[],
  ): Promise<string>;
}
