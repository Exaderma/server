import express, { Express, Request, Response } from "express";
require('dotenv').config()

let cors = require("cors");
let router = require("./link/routes/routesLink");

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
