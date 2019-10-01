/**
 * Functionality for moving (and watching) translation files into public folder
 */

import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import {PluginOptions} from '../../types';
import {defaultPluginOptions} from '../../defaultOptions';
import {ParentSpanPluginArgs} from 'gatsby';

let beingMoved = false;
let waitingPrevious = false;

const publicDir = './public/locales';

const options: PluginOptions = defaultPluginOptions;

const movingDone = ({reporter}: ParentSpanPluginArgs) =>
  new Promise(resolve => {
    if (!beingMoved) {
      resolve();
      return;
    }
    waitingPrevious = true;
    const interval = setInterval(() => {
      reporter.info('Waiting previous moving to finish...');
      if (!beingMoved) {
        reporter.info('Previous moving finished!');
        clearInterval(interval);
        waitingPrevious = false;
        resolve();
      }
    }, 1000);
  });

// copy and minify json files
const moveFiles = async (args: ParentSpanPluginArgs) => {
  const {reporter} = args;
  await movingDone(args);
  beingMoved = true;
  // setup dirs first
  if (!fs.existsSync(publicDir)) {
    reporter.info('Creating locales folder');
    fs.mkdirSync(publicDir);
  }

  options.languages.forEach(lang => {
    const dir = `${publicDir}/${lang}`;
    if (!fs.existsSync(dir)) {
      reporter.info(`Creating language directory for ${lang}`);
      fs.mkdirSync(dir);
    }
  });

  await options.languages.map(lang => {
    const namespacesPromises = options.namespaces.map(ns => {
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.resolve(options.localesDir, `./${lang}/${ns}.json`),
          'utf8',
          (err, rawJson) => {
            if (err) reject(err);

            const jsonToWrite = !!rawJson
              ? JSON.stringify(JSON.parse(rawJson))
              : JSON.stringify({});
            fs.writeFile(
              path.resolve(publicDir, `./${lang}/${ns}.json`),
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

  reporter.success('Moved and minified all translations to locale directory');
  beingMoved = false;
  return;
};

export const onPostBootstrap = async (
  args: ParentSpanPluginArgs,
  userOptions: PluginOptions
) => {
  if (!userOptions)
    throw new Error('No options specified for gatsby-theme-localization');
  const {reporter} = args;

  options.languages = userOptions.languages || options.languages;
  options.namespaces = userOptions.namespaces || options.namespaces;
  options.localesDir = userOptions.localesDir || options.localesDir;

  await moveFiles(args);
  // set up listeners while developing
  if (process.env.NODE_ENV !== 'production') {
    reporter.info('Set up locale file listener!');
    const watcher = chokidar.watch(path.resolve(options.localesDir));
    const moveFn = () => {
      reporter.info('Locale files changed!');
      if (!waitingPrevious) {
        moveFiles(args);
      } else {
        reporter.info('Moving already in queue, skipping...');
      }
    };
    watcher.on('change', moveFn);
    watcher.on('add', moveFn);
  }

  return;
};
