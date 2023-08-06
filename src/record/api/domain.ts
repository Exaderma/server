export interface RepositoryRecord {
    NewRecord : (description : string, type : string, patientEmail : string, doctorEmail: string) => Promise<string>,
    GetRecord : (patientEmail : string, doctorEmail : string) => Promise<any>,
    UpdateRecord : (description : string, type : string, patientEmail : string, doctorEmail: string) => Promise<string>,
}