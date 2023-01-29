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
  newProductDiv.innerHTML = 
      `<div class="card card-product" style="width: 18rem;">
            <img
              class="card-img-top"
              src="/static/img/${data.thumbnail}"
              alt="{{this.title}}"
            />
            <div class="card-body">
              <h3 class="card-title">${data.title}</h3>
              <h5 class="card-title">${data.price}</h5>
              <p class="card-text">${data.description}</p>
            </div>
          </div>`;

  productListContainer.append(newProductDiv);
});


// CHAT

//START utility functions
const getHtml = (template) => template.join("\n");

const renderMeMessage = (message) => {
  const html = getHtml([
    '<div class="app-chat__messages-me">',
    '<div class="app-chat__messages-me-box">',
    '<span class="app-chat__messages-me-box--name">Me</span>',
    `<span class="app-chat__messages-me-box--text">${message}</span>`,
    "</div>",
    "</div>",
  ]);
  return html;
};

const renderUserMessage = (username, message) => {
  const html = getHtml([
    '<div class="app-chat__messages-user">',
    '<div class="app-chat__messages-user-box">',
    `<span class="app-chat__messages-me-box--name">${username}</span>`,
    `<span class="app-chat__messages-me-box--text">${message}</span>`,
    "</div>",
    "</div>",
  ]);
  return html;
};

//END utility functions

let user;

//DOM elemets
const chatBox = document.getElementById("chat-box");
const messagesBox = document.getElementById("messages-box");

//Toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

//Authentification
Swal.fire({
  title: "Identify yourself",
  input: "text",
  text: "Enter your Username into the chat to log in",
  inputValidator: (value) => {
    return !value && "To continue, you need to write your Username ";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
  padding: "16px",
}).then((result) => {
  user = result.value;

  socket.emit("login", user);
});

//Socket logic

//Socket Emitters

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//Socket listeners

socket.on("welcome", (user) => {
  Toast.fire({
    icon: "success",
    title: `Welcome ${user}!`,
  });
});

socket.on("new-user", (user) => {
  Toast.fire({
    icon: "info",
    title: `${user} is online`,
  });
});

socket.on("message-logs", (data) => {
  const html = getHtml(
    data.map((item) => {
      if (item.user === user) {
        return renderMeMessage(item.message);
      } else {
        return renderUserMessage(item.user, item.message);
      }
    })
  );
  messagesBox.innerHTML = html;
});