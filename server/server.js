import express from "express";
import userController from "./controllers/userController.js";
import cors from "cors";
import dbConnect from "./db/db_connect.js";
import { Server } from "socket.io";

const io = new Server(8000);
const connectedClients = [];

// Listen for new socket connections
io.on("connection", (socket) => {
  // send a message to the client
  // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
  // Add the new socket to the connectedClients array
  connectedClients.push(socket);
  if(connectedClients.length === 1){
    console.log("emitt");
    connectedClients[0].emit("set-read-only", "" );
  }
  socket.on("send-message", (message) => {
    // console.log(message);
    const mentorSocket = connectedClients[0];
    // console.log("length" + connectedClients.length);
      // console.log(mentorSocket);
    // Send a message to the mentor client
    mentorSocket.emit("update", message );
  });
  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });

  // Remove the disconnect socket from the connectedClients array
  socket.on('disconnect', () => {
    connectedClients.splice(connectedClients.indexOf(socket), 1);
  });
});


//middleware
const app = express()
app.use(cors());
app.use(express.json())
app.use(userController)

app.listen(3000, function () {
  console.log("Server started listening on port 3000");
});

dbConnect();

