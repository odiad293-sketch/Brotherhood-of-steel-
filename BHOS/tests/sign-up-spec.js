import { signUPCoordinator } from "../scripts/auth/signUP/sign-up.js"
describe("signUPCoordinator", function () {
    let mockFunction;
    beforeEach(function () {
        fixture = document.createElement("div");
        fixture.innerHTML = `
    <div>
    <button class="js-creat-account-btn">create account</button>
    <button class="js-creat-account-btn">sign in</button>
    </div>

    <div class="error-card">
    <button class="close-btn">try again</button>
    <button class="retry-btn">close</button>
    </div>
    `;
        document.body.appendChild(fixture);
        mockFunction = jasmine.createSpyObj("mockFunction", [
            "obsaveAuthSateChange",
            "pwnwInfoGiver",
            "navigate",
            "accountCreation",
            "passwordVisibilityControl",
            "signInRedirector",
            "authProcessor",
            "TimezonesPopulator"
        ]);
    });

    
});