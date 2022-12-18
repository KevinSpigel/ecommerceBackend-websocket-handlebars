const ProductManager = require("./ProductManager");
const express = require("express");

const app = express();

const ecommerce = new ProductManager("./database/productsDataBase.json");

const allProducts = ecommerce.getProducts(); //NO ME DEJA UTILIZAR EL AWAIT PARA ESPERAR LA EJECUCION DE LA FUNCION ASINCRONA

app.get("/products", (req, res) => {
  res.send(allProducts);
});

app.get("/products/", (req, res) => {
  const productLimit = Number(req.query.limit);

  const productsToShow = allProducts.slice(0, productLimit++); //NO SE ME OCURRIO OTRA MANERA DE TRAER LA CANTIDAD DE PRODUCTOS QUE DEFINE EL QUERYPARAM

  if (!productLimit) {
    return res.send(allProducts);
  } else {
    res.send(productsToShow);
  }
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
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
