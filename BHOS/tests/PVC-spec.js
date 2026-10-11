import { passwordVisibilityController } from '../utils/PVC.js';

describe('passwordVisibilityController', function() {
    let fixture;
    beforeEach(() => {
         fixture = document.createElement("div");
        fixture.id = "test-fixture";
        document.body.appendChild(fixture);
        document.querySelector('#test-fixture').innerHTML = `
  <input class="password-value" type="password">
  <span class="password-toggle">visibility</span>

  <input class="js-confirm-password" type="password">
  <span class="confirm-password-toggle">visibility</span>
`;
        passwordVisibilityController()
    });
    
    it('should toggle password to text when click', function() {
        const password = fixture.querySelector('.password-value');
        const passwordtoggle = fixture.querySelector('.password-toggle')
        
        passwordtoggle.click()
        expect(password.type).toBe("text")
    });
    
    it('should  toggle password to password when click again', function() {
        const password = fixture.querySelector('.password-value');
        const passwordtoggle = fixture.querySelector('.password-toggle')
        
        passwordtoggle.click()
        passwordtoggle.click()
        
        expect(password.type).toBe("password")
    });
    
    
    it('should toggle confirm-password to  password when click', function() {
        const confirmPassword = fixture.querySelector('.js-confirm-password');
        const confirmPasswordtoggle = fixture.querySelector('.confirm-password-toggle')
        confirmPasswordtoggle.click()
        expect(confirmPassword.type).toBe("text")
    });
    
    
    it('should toggle confirm-password to password when click again', function() {
        const confirmPassword = fixture.querySelector('.js-confirm-password');
        const confirmPasswordtoggle = fixture.querySelector('.confirm-password-toggle')
        
        confirmPasswordtoggle.click()
        confirmPasswordtoggle.click()
        
        expect(confirmPassword.type).toBe("password")
    });
    
    afterEach(() => {
        fixture.remove()
    });
})