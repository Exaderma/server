import "reflect-metadata";
import { DataSource } from "typeorm";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { RepositoryUpdateProfile } from "../api/domain";
import { hashPassword } from "../../utils/security/hashing";

export class UpdateProfile implements RepositoryUpdateProfile {
  private dbClient: DataSource;

  constructor() {
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [PatientEntity, ProfessionalEntity],
      synchronize: true,
      logging: false,
    });

    this.dbClient
      .initialize()
      .then(() => {
        console.log("UpdateProfile connection is ready");
      })
      .catch((err) => {
        console.log("UpdateProfile repository failed to initialize");
        console.log(err);
      });
  }

  // Patient
  public async updatePatientFirstName(
    email: string,
    firstName: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.firstName = firstName;
    await this.dbClient.manager.save(patient);
    return "Patient first name updated";
  }

  public async updatePatientLastName(
    email: string,
    lastName: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.lastName = lastName;
    await this.dbClient.manager.save(patient);
    return "Patient last name updated";
  }

  public async updatePatientEmail(
    email: string,
    newEmail: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.email = newEmail;
    await this.dbClient.manager.save(patient);
    return "Patient email updated";
  }

  public async updatePatientPhone(
    email: string,
    phone: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.phone = phone;
    await this.dbClient.manager.save(patient);
    return "Patient phone updated";
  }

  public async updatePatientPassword(
    email: string,
    password: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    // TODO : hash password
    patient.password = hashPassword(password);
    await this.dbClient.manager.save(patient);
    return "Patient password updated";
  }

  // Professional
  public async updateProfessionalFirstName(
    email: string,
    firstName: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    console.log(professional);
    if (!professional) {
      return "Professional not found";
    }
    professional.firstName = firstName;
    await this.dbClient.manager.save(professional);
    return "Professional first name updated";
  }

  public async updateProfessionalLastName(
    email: string,
    lastName: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    professional.lastName = lastName;
    await this.dbClient.manager.save(professional);
    return "Professional last name updated";
  }

  public async updateProfessionalEmail(
    email: string,
    newEmail: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    professional.email = newEmail;
    await this.dbClient.manager.save(professional);
    return "Professional email updated";
  }

  public async updateProfessionalPassword(
    email: string,
    password: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    // TODO : hash password
    professional.password = hashPassword(password);
    await this.dbClient.manager.save(professional);
    return "Professional password updated";
  }

  public async updateProfessionalPhone(
    email: string,
    phone: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    professional.phone = phone;
    await this.dbClient.manager.save(professional);
    return "Professional phone updated";
  }

  public async updateProfessionalDepartment(
    email: string,
    department: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    professional.department = department;
    await this.dbClient.manager.save(professional);
    return "Professional department updated";
  }

  public async updateProfessionalAddress(
    email: string,
    address: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: {
          email: email,
        },
      },
    );
    if (!professional) {
      return "Professional not found";
    }
    professional.address = address;
    await this.dbClient.manager.save(professional);
    return "Professional address updated";
  }

  public async addNotePatient(email: string, note: string): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.note = note;
    await this.dbClient.manager.save(patient);
    return "Note added";
  }

  public async removeNotePatient(email: string): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.note = "";
    await this.dbClient.manager.save(patient);
    return "Note removed";
  }

  public async updateNotePatient(
    email: string,
    note: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    patient.note = note;
    await this.dbClient.manager.save(patient);
    return "Note updated";
  }

  public async getNotePatient(email: string): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: {
        email: email,
      },
    });
    if (!patient) {
      return "Patient not found";
    }
    return patient.note;
  }
}
