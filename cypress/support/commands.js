// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-delete-downloads-folder').addCustomCommand();

Cypress.Commands.add("softAssert", (assertions) => {
    const failures = [];
    
    assertions.forEach(({ assertion, expectation, message }) => {
      try {
        assertion();
      } catch (error) {
        failures.push({ expectation, message });
      }
    });
  
    if (failures.length > 0) {
      const failureMessages = failures
        .map(({ expectation, message }) => `${expectation}: ${message}`)
        .join("\n");
  
      throw new Error(`Soft assert failures:\n${failureMessages}`);
    }
  });