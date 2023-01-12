const { Router } = require("express");
const uploader = require("../utils");

const router = Router();

const ProductManager = require("../manager/ProductManager");
const ecommerce = new ProductManager("./database/productsDataBase.json");

router.get("/", async (req, res) => {
  const product = await ecommerce.getProducts();

  if (product) {
    const data = {
      status: true,
      title: "Home",
      style: "index.css",
      list: product,
    };

    res.render("home", data);
  } else {
    return res.status(404).render("home", {
      status: false,
      style: "index.css",
      data: "Empty list",
    });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  const product = await ecommerce.getProducts();

  if (product) {
    const data = {
      status: true,
      title: "Real Time Products",
      style: "index.css",
      list: product,
    };

    res.render("realTimeProducts", data);
  } else {
    return res.status(404).render("realTimeProducts", {
      status: false,
      style: "index.css",
      data: "Empty list",
    });
  }
});

router.post(
  "/realtimeproducts",
  uploader.single("thumbnail"),
  async (req, res) => {
    const addNewProduct = req.body;
    const socket = req.app.get("socket");
    const filename = req.file.filename;

    const newProduct = await ecommerce.addProduct(
      addNewProduct.title,
      addNewProduct.description,
      addNewProduct.code,
      +addNewProduct.price,
      (addNewProduct.thumbnail = `http://localhost:8080/img/${filename}`),
      +addNewProduct.stock,
      addNewProduct.category,
      addNewProduct.status
    );
    socket.emit("newProduct", newProduct);
    res.send({ status: "success" });
  }
);

module.exports = router;
