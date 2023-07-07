import express, { Express, Request, Response } from "express";
require('dotenv').config()

let regiter = require("./auth/register/register");
let login = require("./auth/login/login");

let cors = require("cors");
let router = require("./link/routes/routesLink");

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/", regiter);
app.use("/", login);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
