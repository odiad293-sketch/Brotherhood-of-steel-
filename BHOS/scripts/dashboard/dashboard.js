import { sidebar, renderHeroHTML, renderStatAndFieldHTML } from './dashboard-UI.js';
import { authState } from './dashbordAuth.js';
renderHeroHTML();
renderStatAndFieldHTML();
authState();
sidebar();

const now = new Date();

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Africa/Lagos",
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

const currentDate = formatter.format(now);

console.log(currentDate);


