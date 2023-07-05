import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

let cors = require("cors");
let router = require("./link/routes/routesLink");

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
