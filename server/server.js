const express = require("express")
const mongoose = require("mongoose")
const codeModel = require('./model/codeModel')
const app = express()

app.use(express.json())

app.post("/Codes", async(req, res) => {
    try{
        const code = await codeModel.create(req.body)
        res.status(200).json(code)
    }catch(err){
        console.log(err);
        res.status(500).json({message: error.message});
    }

})

app.get("/Codes/:titleName", (req, res) => {
    const titleName = req.params.titleName
    // Find the code in the MongoDB database by its title
    codeModel.findOne({ title: titleName })
        .then((code) => {
            if (!code) {
                return res.status(404).json({ message: "Code not found" })
            }
            res.json(code)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ message: "Server error" })
        })
})


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
