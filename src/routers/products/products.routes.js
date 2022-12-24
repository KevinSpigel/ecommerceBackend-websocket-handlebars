const { Router } = require("express");

const router = Router();

const products = [];

// Routes
router.get("/", (req, res) => {
  res.json({
    status: "success",
    data: products,
  });
});

router.post("/", (req, res) => {
  const product = req.body;
  products.push(product);
  res.send({
    status: "success",
    data: product,
  });
});

module.exports = router;
