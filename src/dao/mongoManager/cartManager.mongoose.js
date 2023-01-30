const { cartsModel } = require("../../models/carts.model.js");

class CartMongoManager {
  async getCarts() {
    try {
      const allCarts = await cartsModel.find();
      return allCarts;
    } catch (error) {
      throw new Error(`Couldn't read file ${error}`);
    }
  }

  async addCart() {
    try {
      const newCart = await cartsModel.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error(`Error saving: ${error}`);
    }
  }

  async getCartById(id) {
    try {
      const cartById = await cartsModel.findById(id);
      return cartById;
    } catch (error) {
      throw new Error(`Cart with id: ${id} was not found: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      const response = await cartsModel.findByIdAndDelete(id);
      return `Cart with id: ${response.id} was deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting: ${error}`);
    }
  }
}

module.exports = CartMongoManager;
