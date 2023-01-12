const { Router } = require("express");

const router = Router();

const ProductManager = require("../manager/ProductManager");
const ecommerce = new ProductManager("./database/productsDataBase.json");

router.get("/", async (req, res) => {
  const product = await ecommerce.getProducts();

  if (product) {
    const data = {
      status: true,
      title: "Home",
      list: product,
    };

    res.render("home", data);

  } else {
    return res.status(404).render("home", {
      status: false,
      data: "Empty list",
    });
  }
});


router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});




module.exports = router;
