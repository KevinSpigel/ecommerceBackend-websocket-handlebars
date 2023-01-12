// Socket Client side
// Socket server connection --> connection event
const socket = io();

//START utility functions
const getHtml = (template) => template.join("\n");

const renderProduct = (newProduct) => {
  const html = getHtml([
    '<div class="">',
    `<span class="">${newProduct.title}</span>`,
    `<span class="">${newProduct.description}</span>`,
    `<span class="">${newProduct.code}</span>`,
    `<span class="">${newProduct.price}</span>`,
    `<span class="">${newProduct.stock}</span>`,
    `<span class="">${newProduct.category}</span>`,
    `<img src="${newProduct.thumbnail}" alt="${newProduct.title}">`,
    "</div>",
  ]);
  return html;
};

//END utility functions

//DOM elements
const dynamicAllProducts = document.getElementById("dynamicAllProducts");
const newProductForm = document.getElementById("newProductForm");
const messageDiv = document.getElementById("messageDiv");

//Socket Emitters
newProductForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event === "submit") {
    socket.emit("newProduct", {newProduct});
  }
});


//Socket listeners

socket.on("products-logs", (data) => {
  const html = getHtml(
    data.map((item) => {
      renderProduct(newProduct);
    })
  );
  dynamicAllProducts.innerHTML = html;
});
