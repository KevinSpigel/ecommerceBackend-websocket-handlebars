const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const viewsRoutes = require("./routers/views.routes");
const apiRoutes = require("./routers/app.routers");

const app = express();
const port = 8080;

// Listen
const httpServer = app.listen(port, () => {
  console.log("The Server is up and running in the port", port);
});

// Socket server side
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New client connected");
  console.log("Welcome", socket.id);

  socket.on("message", (data) => {
    console.log("new message from the client");
    console.log(data);
  });

  //message from server to client
  socket.emit("individual socket", "This message is for an specific socket");
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
