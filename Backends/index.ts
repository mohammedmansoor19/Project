import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import customer from "./controller/Customer";
import owner from "./controller/Owner";
import Admin from "./controller/Admin";
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/Vehicals", express.static("Vehicals"));
app.use("/Lisence", express.static("Lisence"));

mongoose.connect("mongodb://127.0.0.1:27017/vehical").then(() => {
  console.log("mongodb is connected");
  app.listen(PORT, () => {
    console.log(`server is running this ${PORT}`);
  });
});

app.use("/customer", customer);
app.use("/owner", owner);
app.use("/admin", Admin);
