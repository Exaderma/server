export interface RepositoryLink {
  LinkPatientToDoctor: (patientId: string, doctorId: string) => Promise<string>;
  LinkDoctorToPatient: (doctorId: string, patientId: string) => Promise<string>;
}
