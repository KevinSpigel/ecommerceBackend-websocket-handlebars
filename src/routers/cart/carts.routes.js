const { Router } = require("express");
const {options} = require("../../config/options");


const CartManager = require("../../dao/fileManager/CartManager");

const ecommerce = new CartManager(options.FileSystem.carts);

const router = Router();

// Routes

//CREATE cart
router.post("", async (req, res) => {
  let newCart = await ecommerce.addCart();
  res.send({ status: "success", message: newCart });
});

//GET all carts
router.get("", async (req, res) => {
  let carts = await ecommerce.getCarts();
  const cartLimit = req.query.limit;

  let integerCartLimit;

  if (cartLimit) {
    integerCartLimit = parseInt(cartLimit);
    if (isNaN(integerCartLimit)) {
      return res.status(400).send({
        status: "error",
        error: "cartLimit must be a valid number",
      });
    }
    if (integerCartLimit <= 0 || integerCartLimit > carts.length) {
      return res
        .status(404)
        .send({ status: "error", error: "Carts not found" });
    }
  }

  if (integerCartLimit) carts = carts.slice(0, integerCartLimit);

  res.send({ status: "success", payload: carts });
});

//GET cart by id

router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  if (isNaN(cartId)) {
    return res
      .status(400)
      .send({ status: "error", error: "cartId must be a valid number" });
  }

  const integerCartId = parseInt(cartId);

  if (integerCartId <= 0) {
    res.status(404).send({ status: "error", error: "Cart not found" });
  }

  const cartById = await ecommerce.getCartById(integerCartId);

  if (!cartById) {
    return res.status(404).send({ status: "error", error: "Cart not found" });
  }

  res.send({ status: "success", payload: cartById });
});

//POST new product to cart

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const quantity = +req.query.q;

  let defaultQuantity;

  if (!quantity) {
    defaultQuantity = 1;
  } else {
    defaultQuantity = quantity;
  }

  let addProduct = await ecommerce.addProductToCart(cid, pid, defaultQuantity);
  res.send({ status: "success", message: addProduct });
});

//DELETE product from cart

router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const deleteProduct = await ecommerce.deleteProductFromCart(cid, pid);
  res.send({ status: "success", message: deleteProduct });
});

//DELETE cart by id
router.delete("/:pid", async (req, res) => {
  const pid = +req.params.pid;
  const cartDelete = await ecommerce.deleteCart(pid);
  res.send({ status: "success", message: cartDelete });
});

module.exports = router;
