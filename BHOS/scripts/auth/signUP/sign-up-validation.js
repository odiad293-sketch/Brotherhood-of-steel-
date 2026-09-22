import {
   nationName,
    nationId,
    email,
    password,
    confirmPassword,
    countryselected, 
    selectedTimezone, 
    agreeToTerms, 
    errorCard, 
    formErrorMessage } from './sign-up.js';
  import { scrollToErrorMessage } from './UI.js';

export function formValidation() {
  let passwordValidation = false;
  if (
    nationName.value !== "" &&
    nationId.value !== "" &&
    email.value !== "" &&
    confirmPassword.value !== "" &&
    password.value !== "" &&
    countryselected.value !== "" &&
    selectedTimezone.value !== "" &&
    agreeToTerms.checked
  ) {
    
    if (password.value === confirmPassword.value) {
      
      if (password.value.length >= 8) {
        
        if (
          /\d/.test(password.value) &&
          /[A-Z]/.test(password.value) &&
          /[a-z]/.test(password.value) &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/.test(password.value)
        ) {
          passwordValidation = true;
        }
        
        else {
          scrollToErrorMessage()
          errorCard.style.display = 'block';
          formErrorMessage.textContent = 'Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123';
          return
        }
        
      }
      
      else {
       scrollToErrorMessage()
        errorCard.style.display = 'block';
        formErrorMessage.textContent = 'Password requirements: At least 8 characters, including an uppercase letter, lowercase letter, number, and special character. e.g: Secure@123';
        return
      }
    }
    
    else {
      scrollToErrorMessage()
      errorCard.style.display = 'block';
      formErrorMessage.textContent = 'Please check if password match.';
      return
    }
  }
  
  else {
    scrollToErrorMessage()
    errorCard.style.display = 'block';
    formErrorMessage.textContent = 'Please fill in all required fields before creating your account.';
    return
    
  }
  
  return passwordValidation
}