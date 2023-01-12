// Socket Client side
// Socket server connection --> connection event
const socket = io();

//DOM elements
const form = document.getElementById("newProductForm");
const productListContainer = document.getElementById("product-list-container");

//Socket Emitters

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "manual",
  };

  fetch("http://localhost:8080/realtimeproducts", requestOptions)  //Send formData object within the body request, to be received in req.body from newProduct function
  
  form.reset();
});

//Socket listeners

socket.on("newProduct", (data) => {
  const newProductDiv = document.createElement("div");
  newProductDiv.innerHTML = `
      <div>
          <p>Product:${data.title}</p>
          <p>Price: $${data.price}</p>
      </div>`;

  productListContainer.append(newProductDiv);
});
