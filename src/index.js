const express = require("express");
const apiRoutes = require("./routers/app.routers");

const app = express();
const port = 8080;

// Listen
app.listen(port, () => {
  console.log("The Server is up and running in the port", port);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    status: "error",
    error,
  });
});
