import "reflect-metadata";
import { DataSource } from "typeorm";
import { LinkEntity } from "../../entity/link";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { Mail } from "../../mail/mail";
import { generateRandomNumber } from "../../utils/code";
import { RepositoryLink } from "../api/domain";
import { ImageEntity } from "../../entity/image";
import { CryptData } from "../../utils/encryption";

let mail = new Mail({
  username: process.env.MAIL_USERNAME as string,
  apiKey: process.env.MAIL_API_KEY as string,
});

export class Link implements RepositoryLink {
  private dbClient: DataSource;
  constructor() {
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [LinkEntity, PatientEntity, ProfessionalEntity, ImageEntity],
      synchronize: true,
      logging: false,
    });

    this.dbClient
      .initialize()
      .then(() => {
        console.log("Link repository initialized");
      })
      .catch((err) => {
        console.log("Link repository failed to initialize");
        console.log(err);
      });
  }

  /**
   * Link a patient to a professional
   * @param professionnalId
   * @param patientId
   * @returns success or error
   * @memberof Link
   */
  public async LinkPatientToprofessionnal(
    code: number,
    patientEmail: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { code: String(code) },
      },
    );
    if (!professional) {
      throw new Error("professional not found");
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const link = new LinkEntity();
    link.doctorId = professional.id;
    link.patientId = patient.id;
    await this.dbClient.manager.save(link);
    return "success";
  }

  /**
   * Link a professional to a patient
   * @param professionnalId
   * @param patientId
   * @returns success or error
   * @memberof Link
   */
  public async LinkprofessionnalToPatient(
    professionnalEmail: string,
    email: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionnalEmail },
      },
    );
    if (!professional) {
      throw new Error("professional not found");
    }

    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: email },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }

    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { doctorId: professional.id, patientId: patient.id },
    });
    if (link) {
      throw new Error("Link already exists");
    }

    const generatedCode = generateRandomNumber(6);
    professional.code = String(generatedCode);
    await this.dbClient.manager.save(professional);
    await mail.sendCode(
      "erwan-baillon@orange.fr",
      professional.email,
      String(generatedCode),
    );
    return String(generatedCode);
  }

  /**
   * Get all professionnals linked to a patient
   * @param patientId
   * @returns all information about the professionnals
   * @memberof Link
   */
  public async getLinkPatient(patientEmail: string): Promise<any> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }
    const links = await this.dbClient.manager.find(LinkEntity, {
      where: { patientId: patient.id },
    });
    if (!links) {
      throw new Error("Link not found");
    }
    const professionnals: any[] = [];

    for (const link of links) {
      const professional = await this.dbClient.manager.findOne(
        ProfessionalEntity,
        {
          where: { id: link.doctorId },
        },
      );
      if (professional) {
        if (!professional.imageProfile) {
          professionnals.push(professional);
        } else {
          const professionalWithImage = await this.dbClient.manager.findOne(
            ImageEntity,
            {
              where: { id: professional.imageProfile },
            },
          );
          if (professionalWithImage) {
            professionnals.push({
              ...professional,
              imageProfile:
                (await CryptData.decrypt(
                  professionalWithImage.data.toString("base64"),
                )) || "",
            });
          }
        }
      }
    }

    if (professionnals.length === 0) {
      throw new Error("professional not found");
    }

    return professionnals;
  }

  /**
   * Get all patients linked to a professional
   * @param professionnalId
   * @returns all information about the patients
   * @memberof Link
   */
  public async getLinkprofessionnal(professionnalEmail: string): Promise<any> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionnalEmail },
      },
    );
    if (!professional) {
      throw new Error("professional not found");
    }
    const links = await this.dbClient.manager.find(LinkEntity, {
      where: { doctorId: professional.id },
    });
    if (!links) {
      throw new Error("Link not found");
    }
    const patients: any[] = [];

    for (const link of links) {
      const patient = await this.dbClient.manager.findOne(PatientEntity, {
        where: { id: link.patientId },
      });

      if (patient) {
        if (!patient.imageProfile) {
          patients.push(patient);
        } else {
          const patientWithImage = await this.dbClient.manager.findOne(
            ImageEntity,
            {
              where: { id: patient.imageProfile },
            },
          );
          if (patientWithImage) {
            patients.push({
              ...patient,
              imageProfile: await CryptData.decrypt(
                patientWithImage.data.toString("base64"),
              ),
            });
          }
        }
      }
    }

    if (patients.length === 0) {
      throw new Error("Patient not found");
    }

    return patients;
  }

  /**
   * Remove a link between a patient and a professional
   * @param patientId
   * @param professionnalId
   * @returns success or error
   * @memberof Link
   */
  public async removeLinkPatient(
    patientEmail: string,
    professionalEmail: string,
  ): Promise<any> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionalEmail },
      },
    );
    if (!professional) {
      throw new Error("Professional not found");
    }
    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { patientId: patient.id, doctorId: professional.id },
    });
    if (!link) {
      throw new Error("Link not found");
    }
    await this.dbClient.manager.remove(link);
    return "success";
  }

  /**
   * Remove a link between a professional and a patient
   * @param patientId
   * @param professionnalId
   * @returns success or error
   * @memberof Link
   */
  public async removeLinkprofessionnal(
    professionnalEmail: string,
    patientEmail: string,
  ): Promise<any> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionnalEmail },
      },
    );
    if (!professional) {
      throw new Error("professional not found");
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const link = await this.dbClient.manager.findOne(LinkEntity, {
      where: { doctorId: professional.id, patientId: patient.id },
    });
    if (!link) {
      throw new Error("Link not found");
    }
    await this.dbClient.manager.remove(link);
    return "success";
  }
}
