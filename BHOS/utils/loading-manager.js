export let loadingState = false;
export function setLoadingState(state) {
  loadingState = state;
}
export function loadingStateManager() {
  const overlay = document.querySelector('.overlay');
  if (loadingState === true) {
    overlay.style.display = "flex";
  }
  else {
    overlay.style.display = "none";
  }
}

