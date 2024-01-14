export interface RepositoryUpdateProfile {
  // Patient
  updatePatientFirstName: (email: string, firstName: string) => Promise<string>;
  updatePatientLastName: (email: string, lastName: string) => Promise<string>;
  updatePatientEmail: (email: string, newEmail: string) => Promise<string>;
  updatePatientPassword: (email: string, password: string) => Promise<string>;
  updatePatientPhone: (email: string, phone: string) => Promise<string>;
  // Professional
  updateProfessionalFirstName: (
    email: string,
    firstName: string,
  ) => Promise<string>;
  updateProfessionalLastName: (
    email: string,
    lastName: string,
  ) => Promise<string>;
  updateProfessionalEmail: (email: string, newEmail: string) => Promise<string>;
  updateProfessionalPassword: (
    email: string,
    password: string,
  ) => Promise<string>;
  updateProfessionalPhone: (email: string, phone: string) => Promise<string>;
  updateProfessionalDepartment: (
    email: string,
    department: string,
  ) => Promise<string>;
  updateProfessionalAddress: (
    email: string,
    address: string,
  ) => Promise<string>;
  addNotePatient: (email: string, note: string) => Promise<string>;
  removeNotePatient: (email: string) => Promise<string>;
  updateNotePatient: (email: string, note: string) => Promise<string>;
  getNotePatient: (email: string) => Promise<string>;
}
