import {loadingState} from './loading-manager.js';

const passwordToggle = document.querySelector('.password-toggle');
const confirmPasswordToggle = document.querySelector('.confirm-password-toggle');
const password = document.querySelector('.password-value');
const confirmPassword = document.querySelector('.js-confirm-password');

export function passwordVisibilityController() {
  confirmPasswordToggle.addEventListener('click', () => {
    if (confirmPassword.type === 'password') {
      confirmPassword.type = 'text';
      confirmPasswordToggle.textContent = 'visibility_off';
    } else {
      confirmPassword.type = 'password';
      confirmPasswordToggle.textContent = 'visibility';
    }
  });
  
  passwordToggle.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      passwordToggle.textContent = 'visibility_off';
    } else {
      password.type = 'password';
      passwordToggle.textContent = 'visibility';
    }
  });
}