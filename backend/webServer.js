import express from "express";
import cors from "cors";
import routes from "./routes.js";
import paySlipGenerator from "./paySlipGenerator.js";
import dbconnect from "./database.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use("/app", routes);
server.use("/app", paySlipGenerator);

const hostname = "127.0.0.1";
const port = 3000;

await dbconnect();

server.listen(port, hostname, () => {
  try {
    console.log(`Web Server running at http://${hostname}:${port}/app`);
  } catch (error) {
    console.log("Server-Error");
    console.log(error);
    process.exit(1);
  }
});
