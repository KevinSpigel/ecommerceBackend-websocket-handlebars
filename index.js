const ProductManager = require("./ProductManager");

const express = require("express");

const app = express();

// app.use(express.urlencoded({ extended: true }));

const ecommerce = new ProductManager("./database/productsDataBase.json");

app.get("/products/", async (req, res) => {
  let products = await ecommerce.getProducts();

  const productsLimit = req.query.limit;

  if (productsLimit) products = products.slice(0, Number(productsLimit));

  res.send(products);
});

app.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  const allProducts = await ecommerce.getProducts();

  const product = allProducts.find(
    (product) => product.id === Number(productId)
  );

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.send(product);
});

app.listen(8080, () => {
  console.log("Server is up and running on port 8080");
});

// const fileProcess = async () => {
//   try {
//     const testUpdate = await ecommerce.updateProduct(1, { code: "24" });
//     console.log(testUpdate);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// fileProcess();
