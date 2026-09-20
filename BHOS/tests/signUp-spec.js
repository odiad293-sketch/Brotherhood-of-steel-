import {password} from '../scripts/auth/sign-up.js';

describe("passwordVisibilityController", function() {
 it("passwordVisibilityController", function() {
    if (password === "password") {
      expect(password.type).toBe('password')
    }
    else {
      expect(password.type).toBe('text')
    }
  });
});