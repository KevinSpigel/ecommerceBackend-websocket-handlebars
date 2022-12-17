const ProductManager = require("./ProductManager");
const http = require("http");

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

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf8",
  });
  res.end("Mi primer hola mundo desde Backend");
});

server.listen(8080);
