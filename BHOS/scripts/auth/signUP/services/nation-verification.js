import {scrollToErrorMessage} from '../UI.js';
import {loadingStateManager, setLoadingState} from '../../../../utils/loading-manager.js';


export async function pnwInfoCollector() {
  const errorCard = document.querySelector('.error-card');
  const formErrorMessage = document.querySelector('.error-message');
  let pnwAccVerifier = await pnwVerifier();
  if (pnwAccVerifier.verified === true) {
    return true
  }
  else {
    scrollToErrorMessage()
    formErrorMessage.textContent = pnwAccVerifier.error;
    errorCard.style.display = 'block';
    return false
  }
}

export async function pnwVerifier() {
  const nationId = document.querySelector('.js-nation-id-input');
  const nationName = document.querySelector('.js-nation-input');
  try {
    setLoadingState(true);
    loadingStateManager();

    const response = await fetch(
      "https://bhos-olive.vercel.app/api/verify-nation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nationId: nationId.value,
          nationName: nationName.value
        })
      }
    );

    const data = await response.json();

    if (data.verified === true) {
      return {
        verified: true
      };
    }

    else if (data.message === "Nation not found") {
      return {
        verified: false,
        error: "Nation not found"
      };
    }

    else if (
      data.message === "Nation ID and nation name are required") {
     return {
        verified: false,
        error: "Nation ID and nation name are required"
      };
    }

    else {
      return {
        verified: false,
        error: "Servere error, make sure nationID and nation name are valid."
      };
    }

  } catch (error) {

    console.log(error.message);

    return {
      verified: false,
      error: "Unable to contact the verification server. Try again later."
    };

  } finally {

    setLoadingState(false);
    loadingStateManager();

  }
}