export interface RepositoryLink {
  LinkPatientToDoctor: (code: number, patientEmail: string) => Promise<string>;
  LinkDoctorToPatient: (doctorEmail: string, email: string) => Promise<string>;
  getLinkPatient: (patientEmail: string) => Promise<any>;
  getLinkDoctor: (doctorEmail: string) => Promise<any>;

  removeLinkPatient: (patientEmail: string, professionalEmail : string) => Promise<any>;
  removeLinkDoctor: (doctorEmail: string, patientEmail : string) => Promise<any>;
}
