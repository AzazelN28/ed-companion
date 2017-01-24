const electron = require("electron");
const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");
const { BrowserWindow, app, shell } = electron;
const xmldom = require("xmldom");
const XMLParser = new xmldom.DOMParser();
const XMLSerializer = new xmldom.XMLSerializer();

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

function getGraphicsConfigurationOverride() {
  return new Promise((resolve, reject) => {
    fs.readFile(getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"), { encoding: "utf8" }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(XMLParser.parseFromString(data));
    });
  });
}

/**
 * TODO: Esta función debería recibir dos parámetros, por una parte
 * la configuración actual y por otra la nueva matriz de color a aplicar.
 */
function saveGraphicsConfigurationOverride(matrix = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0]) {
  return new Promise((resolve,reject) => {

    const graphicsConfig = new xmldom.DOMImplementation().createDocument(null, "GraphicsConfig", null);

    /*
    <GraphicsConfig>
      <GUIColour>
        <Default>
          <LocalisationName>Standard</LocalisationName>
          <MatrixRed> 1, 0, 0 </MatrixRed>
          <MatrixGreen> 0, 1, 0 </MatrixGreen>
          <MatrixBlue> 0, 0, 1 </MatrixBlue>
        </Default>
      </GUIColour>
    </GraphicsConfig>
    */

    const guiColour = graphicsConfig.createElement("GUIColour");

    const guiDefault = graphicsConfig.createElement("Default");

    const localisationName = graphicsConfig.createElement("LocalisationName");
    localisationName.textContent = "Standard";

    const matrixRed = graphicsConfig.createElement("MatrixRed");
    matrixRed.textContent = matrix.slice(0,3).join(", ");

    const matrixGreen = graphicsConfig.createElement("MatrixGreen");
    matrixGreen.textContent = matrix.slice(5,8).join(", ");

    const matrixBlue = graphicsConfig.createElement("MatrixBlue");
    matrixBlue.textContent = matrix.slice(10,13).join(", ");

    graphicsConfig.documentElement.appendChild(guiColour);
    guiColour.appendChild(guiDefault);
    guiDefault.appendChild(localisationName);
    guiDefault.appendChild(matrixRed);
    guiDefault.appendChild(matrixGreen);
    guiDefault.appendChild(matrixBlue);
    console.log(XMLSerializer.serializeToString(graphicsConfig));
    return resolve();
    //fs.writeFile(getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"), { encoding: "utf8" }, XMLSerializer.serializeToString());
  });
}

const GraphicsConfigurationOverride = {
  save() {
    return new Promise((resolve,reject) => {
      if (graphicsConfig.documentElement.childNodes.length === 0) {
        const guiColour = graphicsConfig.createElement("GUIColour");
        const guiDefault = graphicsConfig.createElement("Default");
        const localisationName = graphicsConfig.createElement("LocalisationName");
        localisationName.textContent = "Standard";
        const matrixRed = graphicsConfig.createElement("MatrixRed");
        matrixRed.textContent = matrix.slice(0,3).join(", ");
        const matrixGreen = graphicsConfig.createElement("MatrixGreen");
        matrixGreen.textContent = matrix.slice(5,8).join(", ");
        const matrixBlue = graphicsConfig.createElement("MatrixBlue");
        matrixBlue.textContent = matrix.slice(10,13).join(", ");
        graphicsConfig.documentElement.appendChild(guiColour);
        guiColour.appendChild(guiDefault);
        guiDefault.appendChild(localisationName);
        guiDefault.appendChild(matrixRed);
        guiDefault.appendChild(matrixGreen);
        guiDefault.appendChild(matrixBlue);
      } else {

      }
      console.log(XMLSerializer.serializeToString(graphicsConfig));
      return resolve();
      //fs.writeFile(getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"), { encoding: "utf8" }, XMLSerializer.serializeToString());
    });
  },
  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"), { encoding: "utf8" }, (err, data) => {
        if (err) {
          return reject(err);
        }
        graphicsConfig = XMLParser.parseFromString(data);
        const [matrixRed] = graphicsConfig.getElementsByTagName("MatrixRed");
        const [matrixGreen] = graphicsConfig.getElementsByTagName("MatrixGreen");
        const [matrixBlue] = graphicsConfig.getElementsByTagName("MatrixBlue");
        const matrix = [].concat(matrixRed.split(","))
                         .concat(matrixGreen.split(","))
                         .concat(matrixBlue.split(","))
                         .map((value) => parseFloat(value));
        return resolve(matrix);
      });
    });
  }
};


function openLink(link) {
  shell.openExternal(link.href);
}

console.log("Journal path:", getJournalPath());
console.log("Options path:", getOptionsPath());
console.log("GraphicsConfigurationOverride path:", getOptionsPath("Graphics", "GraphicsConfigurationOverride.xml"));

getGraphicsConfigurationOverride().then((config) => {
  if (config.documentElement.childNodes.length === 0) {
    console.log("User doesn't have a graphics configuration");
  } else {
    console.log("User has a graphics configuration");
  }
});

saveGraphicsConfigurationOverride();
