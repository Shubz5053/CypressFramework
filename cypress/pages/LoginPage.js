class LoginPage {
  constructor() {
    this.signinlink = "a[href$='/sign-in']";
    this.email = "input[name='username']";
    this.password = "input[name='password']";
    this.loginbutton = "button[type='submit']";
    this.loader = "img[class='loader-spinner']";
  }

  get SignInLink() {
    return cy.get(this.signinlink);
  }
  get Email() {
    return cy.get(this.email);
  }
  get Password() {
    return cy.get(this.password);
  }
  get LoginButton() {
    return cy.get(this.loginbutton);
  }
  get Loader() {
    return cy.get(this.loader, { timeout: 90000 });
  }
}

const login = new LoginPage();

export default login;
