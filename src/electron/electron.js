const electron = require("electron");
const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");
const { BrowserWindow, app } = electron;

let mainWindow = null;

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

function isJournalFile(filename) {
  return re.test(filename);
}

/**
 * Éste método devuelve la ruta del journal (la ruta varía en función de si
 * el SO es Windows u OS X)
 */
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

function getJournalFiles() {
  return new Promise((resolve, reject) => {
    fs.readdir(getJournalPath(), (err, files) => {
      if (err) {
        return reject(err);
      }

      const filteredFiles = files.filter(isJournalFile);
      filteredFiles.sort((a,b) => {
        const [,ats] = a.match(re);
        const [,bts] = b.match(re);
        return parseInt(bts,10) - parseInt(ats,10);
      });

      return resolve(filteredFiles);
    });
  });  
}

function getJournalFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(getJournalPath(filename), { encoding: "utf8" }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

console.log("Journal's path: ", getJournalPath());
console.log("Options path: ", getOptionsPath());
console.log("GraphicsConfigurationOverride path:", getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"));