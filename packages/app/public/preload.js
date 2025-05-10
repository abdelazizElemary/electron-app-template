/**
 * This is the preload file for the electron app
 * it is used to expose the ipcRenderer to the main window
 * and to disable touchscreen interactions and block some other bypasser
 */
const { contextBridge, ipcRenderer, webFrame } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  },
});

// Disable touchscreen interactions
window.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

// Disable all keyboard inputs and restrict the Windows key
window.addEventListener("keydown", (event) => {
  // Prevent all keys, including Windows key (key codes 91, 92)
  const restrictedKeys = [91, 92, 18, 17, 27]; // Windows, Alt, Ctrl, Escape keys
  if (restrictedKeys.includes(event.keyCode) || event.key === "Meta") {
    event.preventDefault();
  } else {
    event.preventDefault();
  }
});

webFrame.setZoomLevel(-1);
