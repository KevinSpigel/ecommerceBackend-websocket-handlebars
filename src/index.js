const express = require("express");
const handlebars = require("express-handlebars");

const viewsRoutes = require("./routers/views.routes");
const apiRoutes = require("./routers/app.routers");

const app = express();
const port = 8080;

// Listen
app.listen(port, () => {
  console.log("The Server is up and running in the port", port);
});

// Template Engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));

// Routes
app.use(viewsRoutes);
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    status: "error",
    error,
  });
});
