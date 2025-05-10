const { app, BrowserWindow, ipcMain, screen } = require("electron");
const localShortcut = require("electron-localshortcut");
const path = require("path");
const Pusher = require("pusher-js");

let mainWindow = null;
let overlayWindow = null;

// Get configuration from environment variables
const ID = process.env.ID;
const appKey = process.env.APP_KEY;
const cluster = process.env.PUSHER_CLUSTER;

// Initialize Pusher with environment variables
const pusher = new Pusher(appKey, { cluster });
const channel = pusher.subscribe(`channel-${ID}`);

function createOverlayWindow() {
  overlayWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: true,
    fullscreenable: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  overlayWindow.loadURL(
    `file://${path.join(__dirname, "../build/index.html")}#overlay`
  );

  const primaryDisplay = screen.getPrimaryDisplay();
  const displayWidth = primaryDisplay.workArea.width;
  const width = 380;
  const height = 170;

  overlayWindow.setBounds({
    x: displayWidth - width - 0.8 * width,
    y: 0,
    width,
    height,
  });

  overlayWindow.webContents.setZoomFactor(1);

  // Handle overlay window closed
  overlayWindow.on("closed", () => {
    console.log("Overlay window closed");
    overlayWindow = null;
  });

  overlayWindow.on("show", () => console.log("Overlay window shown"));
  overlayWindow.on("hide", () => console.log("Overlay window hidden"));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    show: true,
    kiosk: true,
    fullscreen: true,
    alwaysOnTop: true,
    focusable: true,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);

  mainWindow.on("show", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.focus();
    }
  });

  // Block all keyboard shortcuts
  localShortcut.register(mainWindow, "*", () => {
    return false; // Disable all shortcuts
  });

  // Attempt to disable the Windows key (limited effectiveness)
  mainWindow.on("focus", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.sendInputEvent({
        type: "keyDown",
        keyCode: "Meta",
      });
    }
  });

  mainWindow.webContents.setZoomFactor(1);

  // Handle main window closed
  mainWindow.on("closed", () => {
    console.log("Main window closed");
    mainWindow = null;
  });
}

/**
 * Setup events for the main window whatever you need to do in your electron to respond to the events
 * you receive from the pusher channel that is added from the server
 */
function setupEvents() {
  channel.bind("start-booking", () => {
    console.log("start-booking");
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.hide();
    }
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.hide();
      overlayWindow.webContents.send("close");
    }
  });

  channel.bind("session-end", () => {
    console.log("session-end");
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setAlwaysOnTop(true, "screen-saver");
      mainWindow.setFullScreen(true);
      mainWindow.show();

      setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.focus();
          mainWindow.moveTop();
          mainWindow.webContents.send("session-end");
        }
      }, 100);
    }

    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.hide();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createOverlayWindow();
  setupEvents();

  ipcMain.on("hide-window", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.hide();
    }
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.hide();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Optional: Catch global exceptions to log them
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
