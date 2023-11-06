export interface RepositoryLink {
  LinkPatientToprofessionnal: (
    code: number,
    patientEmail: string,
  ) => Promise<string>;
  LinkprofessionnalToPatient: (
    professionnalEmail: string,
    email: string,
  ) => Promise<string>;
  getLinkPatient: (patientEmail: string) => Promise<any>;
  getLinkprofessionnal: (professionnalEmail: string) => Promise<any>;

  removeLinkPatient: (
    patientEmail: string,
    professionalEmail: string,
  ) => Promise<any>;
  removeLinkprofessionnal: (
    professionnalEmail: string,
    patientEmail: string,
  ) => Promise<any>;
}
