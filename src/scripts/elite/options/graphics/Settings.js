export function load() {

  const {app} = window.require("electron").remote;
  const path = window.require("path");
  const fs = window.require("fs");

  const filePath = path.join(
    app.getPath("home"),
    "AppData",
    "Local",
    "Frontier Developments",
    "Elite Dangerous",
    "Options",
    "Graphics",
    "Settings.xml"
  );
  console.log(`Loading ${filePath}`);
  console.log(fs.readFileSync(filePath, {encoding: "utf8"}));

}

export default {
  load
}
