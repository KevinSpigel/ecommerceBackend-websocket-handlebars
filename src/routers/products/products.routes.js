const { Router } = require("express");

const uploader = require("../../utils");

const router = Router();

const ProductManager = require("../../manager/ProductManager");
const ecommerce = new ProductManager("./database/productsDataBase.json");

// Routes

//CREATE new product

router.post("", uploader.array("thumbnail"), async (req, res) => {
  const { addNewProduct } = req.body;

  const newProduct = await ecommerce.addProduct(
    addNewProduct.title,
    addNewProduct.description,
    addNewProduct.code,
    +addNewProduct.price,
    addNewProduct.thumbnail,
    +addNewProduct.stock,
    addNewProduct.category,
    addNewProduct.status
  );

  res.send({ status: "success", payload: newProduct });
});

//GET all products + query limit param

router.get("", async (req, res) => {
  let products = await ecommerce.getProducts();
  const productsLimit = req.query.limit;

  let integerProductsLimit;

  if (productsLimit) {
    integerProductsLimit = parseInt(productsLimit);
    if (isNaN(integerProductsLimit)) {
      return res.status(400).send({
        status: "error",
        error: "productsLimit must be a valid number",
      });
    }
    if (integerProductsLimit <= 0 || integerProductsLimit > products.length) {
      return res
        .status(404)
        .send({ status: "error", error: "Products not found" });
    }
  }

  if (integerProductsLimit) products = products.slice(0, integerProductsLimit);

  res.send({ status: "success", payload: products });
});

//GET product by id

router.get("/:pid", async (req, res) => {
  const productId = req.params.productId;

  if (isNaN(productId)) {
    return res
      .status(400)
      .send({ status: "error", error: "productId must be a valid number" });
  }

  const integerProductId = parseInt(productId);

  if (integerProductId <= 0) {
    res.status(404).send({ status: "error", error: "Product not found" });
  }

  const productById = await ecommerce.getProductById(integerProductId);

  if (!productById) {
    return res
      .status(404)
      .send({ status: "error", error: "Product not found" });
  }

  res.send({ status: "success", payload: productById });
});

//DELETE product by id

router.delete("/:pid", async (req, res) => {
  const productId = req.params.productId;

  if (isNaN(productId)) {
    return res
      .status(400)
      .send({ status: "error", error: "productId must be a valid number" });
  }

  const integerProductId = parseInt(productId);

  if (integerProductId <= 0) {
    res.status(404).send({ status: "error", error: "Product not found" });
  }

  const deleteProduct = await ecommerce.deleteProduct(integerProductId);

  if (!deleteProduct) {
    return res
      .status(404)
      .send({ status: "error", error: "Product not found" });
  }

  res.send({ status: "success", payload: deleteProduct });
});

module.exports = router;
