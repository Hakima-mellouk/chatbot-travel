const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { trainChatBotIA, generateResponseAI } = require("./chatbot");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
trainChatBotIA();

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.emit(
    "welcome",
    "Welcome ! I'm Travel Assisstant. How can I help You?"
  );
  socket.on("message", async (data) => {
    let response = await generateResponseAI(data);
    
    socket.emit(
      "response",
      response.answer !== undefined
        ? response.answer
        : "I am sorry, I don't understand 😞 "
    );
  });
});

process.on("warning", (e) => console.log(e.stack));

server.listen(3000, () => {
  console.log("listening on *:3300");
});
