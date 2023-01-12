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


//--->

// SOCKET
const io = new Server(httpServer);

// const ProductManager = require("./manager/ProductManager");
// const ecommerce = new ProductManager("./database/productsDataBase.json");

const products = [];

  io.on("connection",   (socket) => {
    console.log("New client connected");

    //async estaba antes del parametro del socket
  // products = await ecommerce.getProducts();
    
    socket.emit("products-logs", products);

    socket.on("newProduct", (newProduct) => {
      product.push(newProduct);
      io.emit("products-logs", products);
    });
  });
  
//<---


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
