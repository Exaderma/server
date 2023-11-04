import express, { Express } from "express";
import { DataManipulation } from "./utils/repository/dataManipulation";
import { Register } from "./routes/auth/repository/register";
import { Login } from "./routes/auth/repository/login";
import { OrganisationRepository } from "./utils/repository/organisationRepository";
import { DataSource } from "typeorm";

require("dotenv").config();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Exaderma Backend Application",
      version: "1.0.0",
      description:
        "the Exaderma Backend Application, a RESTful API for Exaderma to manage the data of the application and user requests",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
  },
  apis: ["src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const dbClient = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  synchronize: true,
  logging: false,
});

const tmp = async () => {
  await dbClient
    .initialize()
    .then(() => {
      console.log("Connection to database established");
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
      process.exit(1);
    });
};

tmp();

let regiter = require("./routes/auth/register/register");
let login = require("./routes/auth/login/login");
let profile = require("./routes/profile/profile");
let router = require("./link/routes/routesLink");

let refreshToken = require("./routes/security/refreshToken");

let record = require("./record/routes/routesRecord");
let updateProfile = require("./updateProfile/routes/routesUpdateProfile");
let image = require("./image/routes/routesImage");

let organisation = require("./routes/organisation/organisation");

let cors = require("cors");

export const registerManager = new Register();
export const loginManager = new Login();
export const dataManager = new DataManipulation();
export const organisationManager = new OrganisationRepository();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/", regiter);
app.use("/", login);

app.use("/", profile);
app.use("/", router);
app.use("/", refreshToken);

app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, { explorer: true }),
);

app.use("/", record);
app.use("/", updateProfile);
app.use("/", image);

app.use("/", organisation);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
