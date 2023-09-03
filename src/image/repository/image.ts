import "reflect-metadata";
import { DataSource } from "typeorm";
import { ImageEntity } from "../../entity/image";
import { PatientEntity } from "../../entity/patient";
import { RepositoryImage } from "../api/domain";
import { name_image } from "../../utils/constants";

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
            entities: [ImageEntity, PatientEntity],
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
        const img = new ImageEntity();
        img.data = Buffer.from(image, "base64");
        img.filename = name_image("pp");
        img.mimetype = "image/png";
        img.type = "pp";
        await this.dbClient.manager.save(img);
        patient.imageProfile = img.id;
        await this.dbClient.manager.save(patient);
        return "Success";
    }

    public async GetPatientImageProfile(
        patientEmail: string,
    ): Promise<string> {
        const patient = await this.dbClient.manager.findOne(PatientEntity, {
            where: { email: patientEmail },
        });
        if (!patient) {
            throw new Error("Patient not found");
        }
        const img = await this.dbClient.manager.findOne(ImageEntity, {
            where: { id: patient.imageProfile },
        });
        if (!img) {
            throw new Error("Image not found");
        }
        return img.data.toString("base64");
    };
}