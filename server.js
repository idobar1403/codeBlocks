import express from "express";
import userController from "./controllers/userController.js";
import cors from "cors";
import dbConnect from "./db/db_connect.js";
import { Server } from "socket.io";
import http from "http";

//middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(userController);

const server = http.createServer(app);
const io = new Server(server);

const connectedClients = [];
var teacherNotified = false;
// Listen for new socket connections
io.on("connection", (socket) => {
  console.log("connected");
  // Add the new socket to the connectedClients array
  connectedClients.push(socket);
  //for the first user set read only as true
  if(connectedClients.length === 1){
    socket.emit("set-read-only", "" );
  }else {  
    //set read only as true for first user and false otherwise
    connectedClients[0].emit("set-read-only", "" );
    socket.emit("set-read-only-false","");
  }
  
  //alert for the first client that he is the teachr
  if(!teacherNotified && connectedClients.length > 0){
    connectedClients[0].emit("teacher-notification");
    teacherNotified = true;
  }
  socket.on("send-message", (message) => {
    const mentorSocket = connectedClients[0];
    setTimeout(() => {
    }, 500);
    mentorSocket.emit("update", message );
  });
  //update values when switch editors
  socket.on("set-read-only-values", () => {
    if(connectedClients.length > 1){
      connectedClients[0].emit("set-read-only", "" );
      connectedClients[1].emit("set-read-only-false","");
    }
  });

  // Remove the disconnect socket from the connectedClients array
  socket.on("disconnect", () => {
    if(connectedClients.indexOf(socket) === 0){
      teacherNotified = false;
    }
    connectedClients.splice(connectedClients.indexOf(socket), 1);
  });
});



const PORT = process.env.PORT || 8080;

server.listen(PORT , function () {
  console.log("Server started listening on port " + PORT);
});

dbConnect();

