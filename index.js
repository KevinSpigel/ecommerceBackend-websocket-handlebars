const ProductManager = require("./ProductManager");

const express = require("express");

const app = express();

const port = 8080;

app.listen(port, () => {
  console.log("The Server is up and running in the port", port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ecommerce = new ProductManager("./database/productsDataBase.json");

app.get("/products/", async (req, res) => {
  let products = await ecommerce.getProducts();
  const productsLimit = req.query.limit;

  let integerProductsLimit;

  if (productsLimit) {
    integerProductsLimit = parseInt(productsLimit);
    if (isNaN(integerProductsLimit)) {
      return res.status(400).send("productsLimit must be a valid number");
    }
    if (integerProductsLimit <= 0 || integerProductsLimit > products.length) {
      return res.status(404).send("Products not found");
    }
  }

  if (integerProductsLimit) products = products.slice(0, integerProductsLimit);

  res.send(products);
});

app.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const allProducts = await ecommerce.getProducts();

  if (isNaN(productId)) {
    return res.status(400).send("productId must be a valid number");
  }

  const integerProductId = parseInt(productId);

  if (integerProductId <= 0) {
    res.status(404).send("Product not found");
  }

  const product = allProducts.find(
    (product) => product.id === integerProductId
  );

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.send(product);
});



// const fileProcess = async () => {
//   try {
//     console.log("Adding product");
//     const addProductTest = await ecommerce.addProduct({
//       title: "test product",
//       description: "adddProductTest",
//       price: "50",
//       thumbnail: "empty",
//       code: "98",
//       stock: "20",
//     });
//     console.log(addProductTest);

//     console.log("Get product by Id");
//     const getProductByIdTest = await ecommerce.getProductById(1);
//     console.log(getProductByIdTest);

//     console.log("Update product by Id");
//     const updateTest = await ecommerce.updateProduct(1, { code: "24" });
//     console.log(updateTest);

//     console.log("Delete product by Id");
//     const deleteProductTest = await ecommerce.deleteProduct(2);
//     console.log(deleteProductTest);
 
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// fileProcess();
