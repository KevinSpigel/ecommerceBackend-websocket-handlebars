const { Router } = require("express");
const productsRoutes = require("./products/products.routes");
const fileRoutes = require("./files/files.routes");

const router = Router();

router.use("/products", productsRoutes);
router.use("/files", fileRoutes);

module.exports = router;
