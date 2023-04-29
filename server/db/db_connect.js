
import mongoose from "mongoose";

const dbConnect = () =>{
mongoose.set("strictQuery", false)

mongoose
  .connect(
    "mongodb+srv://ido1403:codeBlocksPassword@codeblocks.aszhsrm.mongodb.net/Codes"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
}

export default dbConnect;