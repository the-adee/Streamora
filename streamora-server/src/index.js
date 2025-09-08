// this file is maintained to act as entry point that start the server.
// contains server logic not the application logic -> (middlewares, routes)
// easier for testing

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected. Socket ID: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected. Socket ID: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  //   local route to open server '/'
  console.log(`Local: http://localhost:${PORT}/`);
  console.log(`Socket.IO server is waiting for connections...`);
});
