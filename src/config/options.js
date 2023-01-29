//Ways to connect to different systems

const options = {
  FileSystem: {
    products: "./fileSystemDb/productsDataBase.json",
    carts: "./fileSystemDb/cartDataBase.json",
  },
  mongoDb: {
    url: "",
  },
};

module.exports = {options};
