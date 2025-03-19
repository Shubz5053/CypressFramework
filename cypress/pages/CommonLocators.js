

class CommonLocators {
    constructor() {
        this.spinloader1 = "span[class='ant-spin-dot ant-spin-dot-spin']";

    }
    get SpinLoader() {
        return cy.get(this.spinloader1, { timeout: 100000 });
    }
}

const commonlocators = new CommonLocators();

export default commonlocators;