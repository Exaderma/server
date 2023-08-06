export interface RepositoryRecord {
    NewRecord : (description : string, type : string, patientEmail : string, doctorEmail: string) => Promise<string>,
    GetRecord : (patientEmail : string, doctorEmail : string) => Promise<any>,
    UpdateRecord : (id : number, description : string, type : string, patientEmail : string, doctorEmail: string) => Promise<string>,
}