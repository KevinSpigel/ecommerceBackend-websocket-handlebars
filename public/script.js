// Socket Client side
// Socket server connection --> connection event
const socket = io();

//message from client to server
socket.emit("message", "Hi from socket client side");

//Listen message from the server
socket.on("individual socket", (data) => {
  console.log("individual");
  console.log(data);
});
