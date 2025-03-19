const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');
const { removeDirectory } = require('cypress-delete-downloads-folder');
const fs = require('fs')

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugins: [NodeModulesPolyfillPlugin(), createEsbuildPlugin.default(config)],
    })
  );
  on('task', {
    downloadFile, removeDirectory,
    countFiles(folderName) {
      return new Promise((resolve, reject) => {
        fs.readdir(folderName, (err, files) => {
          if (err) {
            return reject(err)
          }

          resolve(files.length)
        })
      })
    }
  })
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}


module.exports = defineConfig({
  projectId: 'km3rje',
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    pageLoadTimeout: 70000,
    defaultCommandTimeout: 70000,
    viewportWidth: 1536,
    viewportHeight: 714,
    chromeWebSecurity: false,
    watchForFileChanges: false, // This will stop autorun test case on change in file
    video: true,
  },
});