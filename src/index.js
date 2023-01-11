const express = require("express");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const viewsRoutes = require("./routers/views.routes");
const apiRoutes = require("./routers/app.routers");

const app = express();
const PORT = process.env.PORT || 8080;

// Listen
const httpServer = app.listen(PORT, () => {
  console.log("The Server is up and running in the port", PORT);
});

// Socket server side

const products=[];

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit ("products-logs", products);

  socket.on("newProduct", (newProduct) => {
    products.push(newProduct);
    io.emit("products-logs", products);
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
