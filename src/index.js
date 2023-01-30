const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
require("./config/dbConfig");

const viewsRoutes = require("./routers/views.routes");
const apiRoutes = require("./routers/app.routers");

const app = express();
const PORT = process.env.PORT || 8080;

// Listen
const httpServer = app.listen(PORT, () => {
  console.log("The Server is up and running in the port", PORT);
});

// SOCKET

const io = new Server(httpServer);

const messages = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  app.set("socket", socket);

  socket.on("login", (user) => {
    socket.emit("message-logs", messages);
    socket.emit("welcome", user);
    socket.broadcast.emit("new-user", user);
  });

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("message-logs", messages);
  });
});

// Template Engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/../public"));

// Routes
app.use(viewsRoutes);
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    status: "error",
    error,
  });
});
