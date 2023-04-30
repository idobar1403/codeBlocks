import app from "express";
import CodeModel from "../model/codeModel.js";

const router = app.Router();

router.get("/Codes", async (req, res) => {
  try {
    const codes = await CodeModel.find();
    res.send(codes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
router.get('/'), (req, res) => {
  res.send("server is up and running");
}
router.get("/Codes/:titleName", async (req, res) => {
  const titleName = req.params.titleName;
  // Find the code in the MongoDB database by its title
  try{
  const code = await CodeModel.findOne({ title: titleName });
  res.send(code);
  } catch(error){
      console.log(err);
      res.status(500).send("Server error" );
    };
});

router.post("/Codes", async (req, res) => {
  try {
    const code = await CodeModel.create(req.body);
    res.status(200).json(code);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
});

export default router;
