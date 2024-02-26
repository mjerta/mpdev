// This eventlistener function is used for  the animation of the hero section
document.addEventListener("DOMContentLoaded", function () {
  const leftCol = document.querySelector(".left-col");
  const rightCol = document.querySelector(".right-col");
  leftCol.classList.add("animate-left-col");
  rightCol.classList.add("animate-right-col");
});

// The eventlistener is used for the tiger animation in the cta button
const textCta = document.querySelector(".cta-text");
let btnCta = document.querySelector(".cta-btn-tiger");
const hideElement = document.getElementById("hide-element");
const leavesElement = document.getElementById("leaves");
let count = 0;

btnCta.addEventListener("mouseover", function () {
  count += 1;
  hideElement.classList.add("hide-element-animation");
  leavesElement.classList.add("leaves-animation");
  textCta.classList.add("animate-text-cta");
});

btnCta.addEventListener("mouseout", function () {
  if (count === 4) {
    hideElement.classList.remove("hide-element-animation");
    leavesElement.classList.remove("leaves-animation");
    textCta.classList.remove("animate-text-cta");
    count = 0;
  }
});

// This eventlistener is used to toggle between darkmode and lightmode
const heroImageSun = document.querySelector(".hero-image-sun");
const body = document.querySelector("body");
const btnProjects = document.querySelector(".btn-projects");
const projects = document.querySelector(".projects-grid");
const focusHighlight = document.querySelector(".focus-highlight");
const activeNavItem = document.querySelector(".active");
const githubLogo = document.querySelector(".github-logo");

heroImageSun.addEventListener("click", function () {
  body.classList.toggle("blackmode-bg");
  body.classList.toggle("blackmode-fc");
  btnCta.classList.toggle("blackmode-fc");
  btnProjects.classList.toggle("blackmode-bg-opposite");
  btnProjects.classList.toggle("blackmode-fc-opposite");
  projects.classList.toggle("blackmode-border-opposite");
  focusHighlight.classList.toggle("blackmode");
  activeNavItem.classList.toggle("blackmode");
  githubLogo.classList.toggle("blackmode");
});

// This function is used to create an animation for all the card elements
function addHoverStateCards() {
  const cardElements = document.querySelectorAll(".card");

  /*  This loop below will add an eventlistener for each
      of the card available in the projects */
  cardElements.forEach((cardElement) => {
    const cardTitleElement = cardElement.querySelector(".card h2");
    const cardSvgElement = cardElement.querySelector(".card h2 svg");
    const cardListElements = cardElement.querySelectorAll(".card li");
    cardElement.addEventListener("mouseover", () => {
      const check = cardElement.classList.contains("card-hover");
      cardElement.classList.add("card-hover");
      /*  This for loop  is to check which card is not been hovered over
          it is to be able to show which one is not selected, during the same time
          a other cards is being hovered over
      */
      for (const checkCardElement of cardElements) {
        const check = checkCardElement.classList.contains("card-hover");
        if (!check) {
          checkCardElement.classList.add("card-opacity");
        }
      }
      cardTitleElement.classList.add("h2-hover");
      cardSvgElement.classList.add("svg-hover");
      for (const cardListElement of cardListElements) {
        cardListElement.classList.add("li-hover");
      }
    });
    cardElement.addEventListener("mouseout", () => {
      /*  This for loop will remove the card-opacity class
          for the ones that was not hovered over.
          This time it has been executed before the card-hover classlist remove.
      */
      for (const checkCardElement of cardElements) {
        const check = checkCardElement.classList.contains("card-hover");
        if (!check) {
          checkCardElement.classList.remove("card-opacity");
        }
      }
      cardElement.classList.remove("card-hover");
      cardTitleElement.classList.remove("h2-hover");
      cardSvgElement.classList.remove("svg-hover");
      for (const cardListElement of cardListElements) {
        cardListElement.classList.remove("li-hover");
      }
    });
  });
}
