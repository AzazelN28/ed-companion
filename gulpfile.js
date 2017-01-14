/* global require, process, __dirname */
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const browserify = require("browserify");
const watchify = require("watchify");
const envify = require("envify/custom");
const exorcist = require("exorcist");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const bs = require("browser-sync");
const chaf = require("connect-history-api-fallback");
const path = require("path");
const fs = require("fs");
const cp = require("child_process");

const isProduction = (process.env.NODE_ENV === "production");

/**
 * Función que devuelve o crea el bundler
 * (sin scope global)
 */
const getBundler = (function() {
  let bundler = null;
  return function() {
    // si el bundler no existe, lo que hacemos es crearlo.
    if (!bundler) {

      // Opciones por defecto.
      const options = {
        debug: !isProduction,
        paths: ["src/scripts"],
        cache: {},
        packageCache: {}
      };

      // si está activo el debug, añadimos watchify
      // como plugin de browserify.
      if (!isProduction) {
        options.plugin = [watchify];
      }

      // creamos el bundler.
      bundler = browserify(options)
        .add("src/scripts/index.js")
        .transform("babelify", { presets: ["latest", "react"] });

      // Esto lo que hace es añadir la transformación uglifyify
      // encargada de guarrear el código.
      if (isProduction) {
        bundler.transform("uglifyify", {
          global: true,
          mangle: true,
          compress: true
        });
      } else {
        bundler.on("update", bundle);
        bundler.on("log", plugins.util.log);
      }

    }
    return bundler;
  }

}());

/**
 * Muestra un error de los buenos.
 */
function notifyOnError() {
  return function(err) {
    plugins.util.log(err.message);
    if (bs.active) {
      bs.notify(err.message, 2000);
    }
  };
}

/**
 * Genera el javascript.
 */
function bundle() {
  // Realizamos el bundling.
  return getBundler()
    .bundle()
    .on("error", notifyOnError())
    .pipe(exorcist("dist/index.js.map"))
    .pipe(source("index.js"))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
}

/**
 * Tarea encargada de generar la documentación.
 */
gulp.task("docs", () => {
  gulp.src(["README.md","src/scripts/**/*.js"])
      .pipe(plugins.jsdoc3({
        opts: {
          destination: "docs"
        }
      }));
});

gulp.task("templates", () => {
  gulp.src("src/templates/index.pug")
    .pipe(plugins.pug({
      locals: {
        title: "Elite Companion"
      }
    }))
    .pipe(gulp.dest("dist"));
});

/**
 * Tarea que construye las imágenes.
 */
gulp.task("assets", () => {

});

/**
 * Tarea que construye las fuentes.
 */
gulp.task("fonts", () => {

});

/**
 * Tarea que construye los scripts.
 */
gulp.task("scripts", () => bundle());

/**
 * Tarea que construye los estilos.
 */
gulp.task("styles", () => {
  const stream = gulp.src("src/styles/index.styl")
    .pipe(plugins.plumber({ errorHandler: notifyOnError("Error: <%= error.message %>") }))
    .pipe(plugins.stylus({ compress: isProduction }))
    .pipe(gulp.dest("dist"))
    .pipe(bs.stream());
  return stream;
});

/**
 * Tarea que construye las plantillas, los estilos, los scripts, las fuentes
 * y los recursos gráficos.
 */
gulp.task("build", ["templates", "styles", "scripts", "assets", "fonts"]);

/**
 * Tarea que escucha los estilos y las plantillas.
 */
gulp.task("watch", ["build"], () => {
  gulp.watch(["src/templates/*.html"], ["templates"]);
  gulp.watch(["src/styles/**/*.styl"], ["styles"]);
});

/**
 * Esta tarea se encarga de abrir un browser-sync
 * con la raíz en `dist`.
 */
gulp.task("browser-sync", () => {
  bs.init({
    server: {
      localOnly: true,
      baseDir: "dist"
    }
  }, (err, bs) => {
    if (!err) {
      const electron = require("electron");
      const options = {
        env: extend({NODE_ENV: 'development'}, env, process.env),
        stdio: 'inherit'
      };
      cp.spawn(electron, ["dist/electron.js"], options);
    }
  });
});

/**
 * Tarea que llama `start:dev` para arrancar el entorno.
 */
gulp.task("dev", ["watch", "browser-sync"]);

/**
 * Tarea por defecto.
 */
gulp.task("default", ["dev"]);
