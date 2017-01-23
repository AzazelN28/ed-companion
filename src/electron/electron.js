const electron = require("electron");
const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");
const { BrowserWindow, app, shell } = electron;

let mainWindow = null;

/**
 * Cuando se cierren todas las ventanas, salimos
 * de la aplicación si es diferente de Mac OS X.
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * Cuando la aplicación esté lista, mostramos una ventana
 * con varias cosas.
 */
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
  if (process.env.OPTIONS_PATH) {
    return process.env.OPTIONS_PATH;
  }

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
  return path.join(app.getPath("appData"), "Frontier Developments", "Elite Dangerous", "Options");
}

/**
 * Devuelve si el nombre del archivo es del journal o no.
 */
function isJournalFile(filename) {
  return re.test(filename);
}

/**
 * Éste método devuelve la ruta del journal (la ruta varía en función de si
 * el SO es Windows u OS X)
 */
function getJournalPath(...args) {
  if (process.env.JOURNAL_PATH) {
    return process.env.JOURNAL_PATH;
  }

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
  return path.join(app.getPath("appData"), "Frontier Developments", "Elite Dangerous", "Saved Games");
}

/**
 *
 */
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

/**
 *
 */
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

const links = {
  "ed": {
    "href": "https://www.elitedangerous.com/",
    "icon": ""
  },
  "edsm": {
    "href": "https://www.edsm.net/",
    "icon": ""
  },
  "eddb": {
    "href": "https://eddb.io/",
    "icon": ""
  },
  "inara": {
    "href": "http://inara.cz/",
    "icon": ""
  },
  "forums": {
    "href": "https://forums.frontier.co.uk/forumdisplay.php/29-Elite-Dangerous",
    "icon": ""
  }
};

function openLink(link) {
  shell.openExternal(link.href);
}

console.log("Journal path:", getJournalPath());
console.log("Options path:", getOptionsPath());
console.log("GraphicsConfigurationOverride path:", getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"));
