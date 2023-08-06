import express, { Express } from "express";
import { DataManipulation } from './utils/repository/dataManipulation';
import { Register } from './routes/auth/repository/register'
import { Login } from './routes/auth/repository/login'

require("dotenv").config();

let regiter = require("./routes/auth/register/register");
let login = require("./routes/auth/login/login");
let profile = require("./routes/profile/profile");
let router = require("./link/routes/routesLink");
let record = require("./record/routes/routesRecord");

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

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
