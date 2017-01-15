const electron = require("electron");
const path = require("path");
const fs = require("fs");
const { BrowserWindow, app } = electron;

let mainWindow = null;
let currentSize = 0;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL("file://" + path.join(__dirname, "index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.openDevTools({ detach: true });
  }
});

const re = /Journal\.([0-9]{12})\.([0-9]+)\.log/;

function isJournalFile(filename) {
  return re.test(filename);
}

function getOptionsPath(...args) {
  if (process.platform === "darwin") {
    return path.join(
      app.getPath("home"),
      "Library",
      "Application Support",
      "Frontier Developments",
      "Elite Dangerous",
      "Options",
      ...args
    );
  } else if (process.platform === "win32") {
    return path.join(
      app.getPath("home"),
      "AppData",
      "Local",
      "Frontier Developments",
      "Elite Dangerous",
      "Options",
      ...args
    );
  }
  return null;
}

function getJournalPath(...args) {
  if (process.platform === "darwin") {
    return path.join(
      app.getPath("home"),
      "Library",
      "Application Support",
      "Frontier Developments",
      "Elite Dangerous",
      ...args
    );
  } else if (process.platform === "win32") {
    return path.join(
      app.getPath("home"),
      "Saved Games",
      "Frontier Developments",
      "Elite Dangerous",
      ...args
    );
  }
  return null;
}

console.log("Journal's path: ", getJournalPath());

function journal(err, stats) {
  console.log("Growed: ", stats.size - currentSize);
  const start = currentSize;
  const end = stats.size;
  currentSize = stats.size;
  const stream = fs.createReadStream(getJournalPath(filename), { encoding: "utf-8", start, end });
  stream.on("data", (chunk) => {
    const event = JSON.parse(chunk);
    console.log("Journal event: ", event);
    if (mainWindow !== null) {
      mainWindow.webContents.send("journal", event);
    }
  });
  stream.on("end", () => {
    stream.destroy();
  });
}

fs.watch(getJournalPath(), (type, filename) => {
  console.log(type, filename);
  if (type === "rename" && isJournalFile(filename)) {
    // El archivo fue creado por el Player's Journal.
    fs.stat(getJournalPath(filename), journal);
  } else if (type === "change" && isJournalFile(filename)) {
    // El archivo fue cambiado por el Player's Journal.
    fs.stat(getJournalPath(filename), journal);
  }
});
