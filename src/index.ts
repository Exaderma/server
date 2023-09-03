import express, { Express } from "express";
import { DataManipulation } from './utils/repository/dataManipulation';
import { Register } from './routes/auth/repository/register'
import { Login } from './routes/auth/repository/login'
import { DataSource } from "typeorm";

require("dotenv").config();

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

dbClient
  .initialize()
  .then(() => {
    console.log("Connection to database established")
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
    process.exit(1);
  });

let regiter = require("./routes/auth/register/register");
let login = require("./routes/auth/login/login");
let profile = require("./routes/profile/profile");
let router = require("./link/routes/routesLink");
let record = require("./record/routes/routesRecord");
let updateProfile = require("./updateProfile/routes/routesUpdateProfile");
let image = require("./image/routes/routesImage");

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
app.use("/", profile);
app.use("/", login);
app.use("/", record);
app.use("/", updateProfile);
app.use("/", image);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
