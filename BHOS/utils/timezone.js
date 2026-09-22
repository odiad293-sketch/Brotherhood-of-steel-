import { selectedTimezone } from "../scripts/auth/signUP/sign-up.js";
export function populateTimezones() {
  
    // Get all the timezones supported by the browser
  const timezones = Intl.supportedValuesOf('timeZone');
  
  // Get the user's current timezone
  const userTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create an option for every timezone
  timezones.forEach((timezone) => {
    
    const option = document.createElement('option');
    
    option.value = timezone;
    option.textContent = timezone;
    
    // Automatically select the user's timezone
    if (timezone === userTimezone) {
      option.selected = true;
    }
    selectedTimezone.appendChild(option);
  });
  
}