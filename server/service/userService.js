import CodeModel from "../model/codeModel.js";
import io, { Socket } from 'socket.io';

// const socket = io('http://localhost:3000');

io.on("connection", (socket) => {
  // ...
});

const getAllCodes = async (res) => {
    try {
        const codes = await CodeModel.find();
        return codes;
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
}

export {getAllCodes}