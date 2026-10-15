import { loadingState, loadingStateManager, setLoadingState } from "../utils/loading-manager.js"
describe("setLoadingState", function () {
    it("should modify setloadingState", function () {
        loadingState
        setLoadingState(true)
        expect(loadingState).toBe(true)
    });
});

describe("LoadingStateManager", function () {

    let element;
    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);
        element.innerHTML = `
            <div class="overlay">
    <div class="loading-state">
      <img class="bhos-logo-loading" src="images/BHOS-log.png" alt="logo" />
      <div class="loading-writeup">Loading...</div>
         </div>
       </div>
        `;
    });

    it("lodingStateManager should set overlay display to flex when loadingState is true", function () {
        loadingState
        setLoadingState(true)
        const overlay = document.querySelector('.overlay')
        loadingStateManager()
        expect(overlay.style.display).toBe("flex")
    })

    it("lodingStateManager should set overlay display to none when loadingState is false", function () {
        loadingState
        setLoadingState(false)
        const overlay = document.querySelector('.overlay')
        loadingStateManager()
        expect(overlay.style.display).toBe("none")
    })

     afterEach(() => {
        element.remove()
    });
});