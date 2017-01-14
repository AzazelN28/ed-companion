import {app} from "electron";
import cheerio from "cheerio";
import path from "path";

export function load() {

  const filePath = path.join(
    app.getPath("appData"),
    "Frontier Developments",
    "Elite Dangerous",
    "Options",
    "Graphics",
    "GraphicsConfigurationOverride.xml"
  );
  console.log(`Loading ${filePath}`);

}
