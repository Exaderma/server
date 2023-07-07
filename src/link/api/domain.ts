export interface RepositoryLink {
  LinkPatientToDoctor: (code : number, patientId : number) => Promise<string>;
  LinkDoctorToPatient: (doctorId: number, email: string) => Promise<string>;
  getLinkPatient: (patientId: number) => Promise<any>;
  getLinkDoctor: (doctorId: number) => Promise<any>;
}
