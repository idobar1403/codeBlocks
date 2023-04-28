import express from "express";
import mongoose from "mongoose";
import userController from "./controllers/userController.js";
import cors from "cors";


//middlewares
const app = express()
app.use(cors());
app.use(express.json())
app.use(userController)


mongoose.set("strictQuery", false)

mongoose
  .connect(
    "mongodb+srv://ido1403:codeBlocksPassword@codeblocks.aszhsrm.mongodb.net/Codes"
  )
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(3000, function () {
      console.log("Server started listening on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
