import login from "../../pages/LoginPage.js";
import commonlocators from "../../pages/CommonLocators.js";
import {
  Given,
  When,
  Then
} from "@badeball/cypress-cucumber-preprocessor";


let UserDetails;

beforeEach(() => {
  cy.fixture("Login.json").then((user) => {
    UserDetails = user;
  });
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })
});

beforeEach(() => {
  cy.restoreLocalStorage();
})

// Scenario: I want to do Login
Given("I navigate to the website", () => {
  cy.visit("/web/index.php/auth/login")
  cy.log("Site Opened")
});

When("Click on login link", () => {
  login.Loader.should('have.length', 0)
  login.SignInLink.click()
  login.Loader.should('have.length', 0)
});

When("User enters email or password", () => {
  login.Email.clear().type(UserDetails.wfdProvider1)
  login.Password.clear().type(UserDetails.password)
});

When("User click on login button", () => {
  login.LoginButton.click()
});

Then("Validate the user is login", () => {
  cy.get('h6').eq(0).contains('Dashboard').should('have.length', 1)
});

afterEach(() => {
  cy.saveLocalStorage();
});


