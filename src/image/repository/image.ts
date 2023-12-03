import "reflect-metadata";
import { DataSource } from "typeorm";
import { ImageEntity } from "../../entity/image";
import { PatientEntity } from "../../entity/patient";
import { ProfessionalEntity } from "../../entity/professional";
import { RepositoryImage } from "../api/domain";
import { name_image } from "../../utils/constants";
import { convertToJPEG } from "../../utils/convert";
import { CryptData } from "../../utils/encryption";
import { FolderEntity } from "../../entity/folder";
import { LinkEntity } from "../../entity/link";

export class Image implements RepositoryImage {
  private dbClient: DataSource;
  constructor() {
    this.dbClient = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      entities: [ImageEntity, PatientEntity, ProfessionalEntity, FolderEntity, LinkEntity],
      synchronize: true,
      logging: false,
    });

    this.dbClient
      .initialize()
      .then(() => {
        console.log("Image repository initialized");
      })
      .catch((err) => {
        console.log("Image repository failed to initialize");
        console.log(err);
      });
  }

  public async SetPatientImageProfile(
    image: string,
    patientEmail: string,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    if (patient.imageProfile) {
      const img = await this.dbClient.manager.findOne(ImageEntity, {
        where: { id: patient.imageProfile },
      });
      if (!img) {
        throw new Error("Image not found");
      }
      img.data = Buffer.from(
        await CryptData.encrypt(await convertToJPEG(image)),
        "base64",
      );
      img.filename = name_image("pp");
      await this.dbClient.manager.save(img);
    } else {
      const img = new ImageEntity();
      img.data = Buffer.from(
        (await CryptData.encrypt(await convertToJPEG(image))) as string,
        "base64",
      );
      img.filename = name_image("pp");
      img.type = "pp";
      await this.dbClient.manager.save(img);
      patient.imageProfile = img.id;
      await this.dbClient.manager.save(patient);
    }
    return "Success";
  }

  private async GetPatientImageProfileById(
    id_patient: number,
  ): Promise<string> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { id: id_patient },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    if (!patient.imageProfile) {
      throw new Error("Patient does not have image");
    }
    const img = await this.dbClient.manager.findOne(ImageEntity, {
      where: { id: patient.imageProfile },
    });
    if (!img) {
      throw new Error("Image not found");
    }
    return await CryptData.decrypt(img.data.toString("base64"));
  }

  private async GetProfessionalImageProfileById(
    id_professional: number,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { id: id_professional },
      },
    );
    if (!professional) {
      throw new Error("Professional not found");
    }
    if (!professional.imageProfile) {
      throw new Error("Professional does not have image");
    }
    const img = await this.dbClient.manager.findOne(ImageEntity, {
      where: { id: professional.imageProfile },
    });
    if (!img) {
      throw new Error("Image not found");
    }
    return await CryptData.decrypt(img.data.toString("base64"));
  }

  public async GetPatientImageProfile(
    patientEmail: string,
    id_patient?: number,
  ): Promise<string> {
    if (id_patient) {
      const token_professional: string = patientEmail; // patientEmail is actually the token of the professional
      const professional = await this.dbClient.manager.findOne(
        ProfessionalEntity,
        {
          where: { email: token_professional },
        },
      );
      if (!professional) {
        throw new Error("Professional not found");
      }
      return this.GetPatientImageProfileById(id_patient);
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    if (!patient.imageProfile) {
      throw new Error("Patient does not have image");
    }
    const img = await this.dbClient.manager.findOne(ImageEntity, {
      where: { id: patient.imageProfile },
    });
    if (!img) {
      throw new Error("Image not found");
    }
    return await CryptData.decrypt(img.data.toString("base64"));
  }

  public async GetProfessionalImageProfile(
    professionalEmail: string,
    id_professional?: number,
  ): Promise<string> {
    if (id_professional) {
      const token_professional: string = professionalEmail; // professionalEmail is actually the token of the patient
      const professional = await this.dbClient.manager.findOne(
        PatientEntity,
        {
          where: { email: token_professional },
        },
      );
      if (!professional) {
        throw new Error("Professional not found");
      }
      return this.GetProfessionalImageProfileById(id_professional);
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
    if (!professional.imageProfile) {
      throw new Error("Professional does not have image");
    }
    const img = await this.dbClient.manager.findOne(ImageEntity, {
      where: { id: professional.imageProfile },
    });
    if (!img) {
      throw new Error("Image not found");
    }
    return await CryptData.decrypt(img.data.toString("base64") as string);
  }

  public async SetProfessionalImageProfile(
    image: string,
    professionalEmail: string,
  ): Promise<string> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionalEmail },
      },
    );
    if (!professional) {
      throw new Error("Professional not found");
    }
    if (professional.imageProfile) {
      const img = await this.dbClient.manager.findOne(ImageEntity, {
        where: { id: professional.imageProfile },
      });
      if (!img) {
        throw new Error("Image not found");
      }
      img.data = Buffer.from(
        await CryptData.encrypt(await convertToJPEG(image)),
        "base64",
      );
      img.filename = name_image("pp");
      await this.dbClient.manager.save(img);
    } else {
      const img = new ImageEntity();
      img.data = Buffer.from(
        await CryptData.encrypt(await convertToJPEG(image)),
        "base64",
      );
      img.filename = name_image("pp");
      img.type = "pp";
      await this.dbClient.manager.save(img);
      professional.imageProfile = img.id;
      await this.dbClient.manager.save(professional);
    }
    return "Success";
  }

  public async SetImageGallery(
    image: string,
    patientEmail: string,
    id_patient?: number,
  ): Promise<string> {
    let idFolder: number | null = null;
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const folder = await this.dbClient.manager.findOne(FolderEntity, {
      where: { patientId: patient.id },
    });

    if (!folder) {
      const newFolder = new FolderEntity();
      newFolder.name = "Default";
      newFolder.patientId = patient.id;
      await this.dbClient.manager.save(newFolder);
      idFolder = newFolder.id;
    }
    const img = new ImageEntity();
    img.data = Buffer.from(
      await CryptData.encrypt(await convertToJPEG(image)),
      "base64",
    );
    img.filename = name_image("gallery");
    img.type = "gallery";
    img.folderId = folder?.id || idFolder;
    await this.dbClient.manager.save(img);
    return "Success";
  }

  private async GetImageGalleryById(
    id_patient: number,
  ): Promise<{data: string}[]> {
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { id: id_patient },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const folder = await this.dbClient.manager.findOne(FolderEntity, {
      where: { patientId: patient.id },
    });
    if (!folder) {
      throw new Error("Folder not found");
    }
    const images = await this.dbClient.manager.find(ImageEntity, {
      where: { folderId: folder.id },
    });
    if (!images) {
      throw new Error("Images not found");
    }
    const imagesData: { data: string }[] = [];
    for (const image of images) {
      imagesData.push({ data: await CryptData.decrypt(image.data.toString("base64")) });
    }
    return imagesData
  }

  public async GetImageGallery(
    patientEmail: string,
    id_patient?: number,
  ): Promise<{data: string}[]> {
    let idFolder: number | null = null;
    if (id_patient) {
      const token_professional: string = patientEmail;
      const professional = await this.dbClient.manager.findOne(
        ProfessionalEntity,
        {
          where: { email: token_professional },
        },
      );
      if (!professional) {
        throw new Error("Professional not found");
      }
      return this.GetImageGalleryById(id_patient);
    }
    const patient = await this.dbClient.manager.findOne(PatientEntity, {
      where: { email: patientEmail },
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    const folder = await this.dbClient.manager.findOne(FolderEntity, {
      where: { patientId: patient.id },
    });

    if (!folder) {
      const newFolder = new FolderEntity();
      newFolder.name = "Default";
      newFolder.patientId = patient.id;
      await this.dbClient.manager.save(newFolder);
      idFolder = newFolder.id;
    }
    const images = await this.dbClient.manager.find(ImageEntity, {
      where: { folderId: idFolder || folder?.id },
    });
    if (!images) {
      throw new Error("Images not found");
    }
    const imagesData: { data: string }[] = [];
    for (const image of images) {
      imagesData.push({ data: await CryptData.decrypt(image.data.toString("base64")) });
    }
    return imagesData
  }

  public async GetAllFolder(
    professionalEmail: string
  ): Promise<{id: number, name: string, data: {image: string}[]}[]> {
    const professional = await this.dbClient.manager.findOne(
      ProfessionalEntity,
      {
        where: { email: professionalEmail },
      },
    );
    if (!professional) {
      throw new Error("Professional not found");
    }
    const links = await this.dbClient.manager.find(LinkEntity, {
      where: { doctorId: professional.id },
    });
    if (!links) {
      throw new Error("Links not found");
    }
    const folders: {id: number, name: string, data: {image: string}[]}[] = [];
    for (const link of links) {
      const patient = await this.dbClient.manager.findOne(PatientEntity, {
        where: { id: link.patientId },
      });
      if (!patient) {
        throw new Error("Patient not found");
      }
      const folder = await this.dbClient.manager.findOne(FolderEntity, {
        where: { patientId: patient.id },
      });
      if (folder) {
        const images = await this.dbClient.manager.find(ImageEntity, {
          where: { folderId: folder.id },
        });
        if (!images) {
          throw new Error("Images not found");
        }
        const imagesData: { image: string }[] = [];
        for (let i = 0; i < 3; i++) {
          if (images[i]) {
            imagesData.push({ image: await CryptData.decrypt(images[i].data.toString("base64")) });
          }
        }
        folders.push({id: folder.id, name: folder.name + " - " + patient.lastName, data: imagesData});
      }
    }
    return folders;
  }
}
