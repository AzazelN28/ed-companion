const {ipcRenderer} = window.require("electron");
ipcRenderer.on("journal", (event, message) => {
  console.log(message);
});
console.log("Hello World");
