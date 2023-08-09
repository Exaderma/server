import express, { Express } from "express";
import { DataManipulation } from './utils/repository/dataManipulation';
import { Register } from './routes/auth/repository/register'
import { Login } from './routes/auth/repository/login'

require("dotenv").config();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express");

const options = {
  swaggerDefinition : {
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
        description: "Local server"
      }
    ]
  },
  apis: ["src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

let regiter = require("./routes/auth/register/register");
let login = require("./routes/auth/login/login");
let profile = require("./routes/profile/profile");
let router = require("./link/routes/routesLink");
let refreshToken = require("./routes/security/refreshToken");

let cors = require("cors");

export const registerManager = new Register();
export const loginManager = new Login();
export const dataManager = new DataManipulation();

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

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { explorer: true }));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
