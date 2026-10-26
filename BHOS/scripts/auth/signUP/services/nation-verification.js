import { scrollToErrorMessage } from '../UI.js';
import { loadingStateManager, setLoadingState } from '../../../../utils/loading-manager.js';

export async function pnwInfoCollector(dependencies = {}) {
  const {
    nationVerifier = pnwVerifier
  } = dependencies;
    
  const errorCard = document.querySelector('.error-card');
  const formErrorMessage = document.querySelector('.error-message');

 let result = await nationVerifier();
  if (result.verified === true) {
    return true
  }
  else {
    scrollToErrorMessage()
    formErrorMessage.textContent = result.error;
    errorCard.style.display = 'block';
    return false
  }
}

export async function pnwVerifier() {
  try {
    const nationName = document.querySelector('.js-nation-input');
    const nationId = document.querySelector('.js-nation-Id-input');

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

    else if (data.message === "Nation ID and nation name are required") {
      return {
        verified: false,
        error: "Nation ID and nation name are required"
      };
    }

    else {
      return {
        verified: false,
        error: "Server error, make sure nationID and nation name are valid."
      };
    }

  } catch (error) {
    return {
      verified: false,
      error: error.message
    };

  } finally {

    setLoadingState(false);
    loadingStateManager();

  }
}