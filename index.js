const ProductManager = require("./ProductManager");

const ecommerce = new ProductManager("./database/productsDataBase.json");

const fileProcess = async () => {
  try {
    const testUpdate = await ecommerce.updateProduct(1, { code: "24" });
    console.log(testUpdate);
  } catch (error) {
    throw new Error(error);
  }
};

fileProcess();
