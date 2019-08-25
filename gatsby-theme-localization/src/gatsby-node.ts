import { PluginOptions } from "./types";
import fs from "fs";
import path from "path";
import chokidar from "chokidar";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

process.env.GATSBY_SSR_DIRNAME = __dirname;

// user settings
const options: PluginOptions = {
  languages: [],
  namespaces: [],
  localesDir: "./src/locales",
  publicDir: "./public/locales"
};

let beingMoved = false;
let waitingPrevious = false;

const movingDone = () =>
  new Promise(resolve => {
    if (!beingMoved) {
      resolve();
      return;
    }
    waitingPrevious = true;
    const interval = setInterval(() => {
      console.log("Waiting previous moving to finish...");
      if (!beingMoved) {
        console.log("Previous moving finished!");
        clearInterval(interval);
        waitingPrevious = false;
        resolve();
      }
    }, 1000);
  });

// copy and minify json files
const moveFiles = async () => {
  await movingDone();
  beingMoved = true;
  // setup dirs first
  if (!fs.existsSync(options.publicDir)) {
    console.info("Creating locales folder");
    fs.mkdirSync(options.publicDir);
  }

  options.languages.forEach(lang => {
    const dir = `${options.publicDir}/${lang}`;
    if (!fs.existsSync(dir)) {
      console.log(`Creating language directory for ${lang}`);
      fs.mkdirSync(dir);
    }
  });

  await options.languages.map(lang => {
    const namespacesPromises = options.namespaces.map(ns => {
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.resolve(options.localesDir, `./${lang}/${ns}.json`),
          "utf8",
          (err, rawJson) => {
            if (err) reject(err);

            const jsonToWrite = !!rawJson
              ? JSON.stringify(JSON.parse(rawJson))
              : JSON.stringify({});
            fs.writeFile(
              path.resolve(options.publicDir, `./${lang}/${ns}.json`),
              jsonToWrite,
              () => {
                resolve();
              }
            );
          }
        );
      });
    });

    return Promise.all(namespacesPromises);
  });

  console.log("Moved and minified all translations to locale directory");
  beingMoved = false;
  return;
};

export const onPreBootstrap = (_: any, userOptions: PluginOptions) => {
  // set up options
  // TODO: dont do it like that
  options.languages = userOptions.languages || options.languages;
  options.namespaces = userOptions.namespaces || options.namespaces;
  options.localesDir = userOptions.localesDir || options.localesDir;
};

export const onPostBootstrap = async () => {
  await moveFiles();

  // set up listeners while developing
  if (process.env.NODE_ENV !== "production") {
    console.log("Set up locale file listener!");
    const watcher = chokidar.watch(path.resolve(options.localesDir));
    const moveFn = () => {
      console.log("Locale files changed!");
      if (!waitingPrevious) {
        moveFiles();
      } else {
        console.log("Moving already in queue, skipping...");
      }
    };
    watcher.on("change", moveFn);
    watcher.on("add", moveFn);
  }

  return;
};
