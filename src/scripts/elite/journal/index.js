const re = /Journal\.([0-9]{12})\.([0-9]+)\.log/;

function isJournal(filename) {
  return re.test(filename);
}

function getPath(...args) {

    const {app} = window.require("electron").remote;
    const path = window.require("path");
    const fs = window.require("fs");

    const basePath = path.join(
      app.getPath("home"),
      "Saved Games",
      "Frontier Developments",
      "Elite Dangerous"
    );

    return path.join(basePath, ...args);

}

function getFiles() {

  // ordenamos los journals de más nuevo a más viejo.
  /*journals.sort((a,b) => {
    const [,timestampA] = a.match(re);
    const [,timestampB] = b.match(re);
    return parseInt(timestampB, 10) - parseInt(timestampA, 10);
  });*/

  const fs = window.require("fs");
  return new Promise((resolve, reject) => {
    fs.readdir(getPath(), (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files.filter(isJournal));
    });
  });
}

// archivo actual.
let currentFilename = null;
let currentFilestream = null;

function watch() {
  const fs = window.require("fs");
  fs.watch(getPath(), { recursive: true }, (eventType, filename) => {
    console.log(eventType,filename);
    if (eventType === "change") {
      console.log(`Journal ${filename} changed`);

      fs.watchFile(getPath(filename), (curr, prev) => {
        console.log(curr,prev);
      });

      // TODO: Marcar el nuevo archivo que se debe leer.
      if (filename !== currentFilename && isJournal(filename)) {
        currentFilename = filename;
        if (currentFilestream !== null) {
          currentFilestream.destroy();
        }
        console.log("Setting the current file stream to", filename);
        // TODO: Hacer que se lea el nuevo archivo (crear un fs.createReadStream)
        currentFilestream = fs.createReadStream(getPath(currentFilename), {
          encoding: "utf8",
          autoClose: false
        });
        currentFilestream.on("error", () => {
          console.log("error");
        });
        currentFilestream.on("readable", () => {
          console.log("readable");
          currentFilestream.read();
        });
        currentFilestream.on("data", (chunk) => {
          console.log("data");
          console.log(chunk);
          const lines = chunk.split("\n");
          console.log(
            lines.filter((line) => line.replace(/^\s+|\s+$/,"").length !== 0)
                 .map((line) => JSON.parse(line))
          );
        });
        currentFilestream.on("end", () => {
          console.log("end");
        });
        currentFilestream.on("open", () => {
          console.log("open");
        });
        currentFilestream.on("close", () => {
          console.log("close");
        });
      }
    }
  });
}

function create() {
  watch();
}

export default {
  create
}
