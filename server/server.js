import express from "express";
import userController from "./controllers/userController.js";
import cors from "cors";
import dbConnect from "./db/db_connect.js";

//middleware
const app = express()
app.use(cors());
app.use(express.json())
app.use(userController)

app.listen(3000, function () {
  console.log("Server started listening on port 3000");
});

dbConnect();

