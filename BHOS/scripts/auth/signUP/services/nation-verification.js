import { scrollToErrorMessage } from '../UI.js';
import { loadingStateManager, setLoadingState } from '../../../../utils/loading-manager.js';

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
  try {
    const nationName = document.querySelector('.js-nation-input');
    const nationId = document.querySelector('.js-nation-Id-input');
    console.log("nationName element:", nationName);
    console.log("nationId element:", nationId);
    
    console.log("nationName value:", nationName?.value);
    console.log("nationId value:", nationId?.value);
    setLoadingState(true);
    loadingStateManager();
    console.log("Sending to server:", {
      nationId: nationId?.value,
      nationName: nationName?.value
    });
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
        error: "Server error, make sure nationID and nation name are valid."
      };
    }
    
  } catch (error) {
    console.error("PNW VERIFIER ERROR:", error);
    return {
      verified: false,
      error: error.message
    };
    
  } finally {
    
    setLoadingState(false);
    loadingStateManager();
    
  }
}