const leftCol = document.querySelector(".left-col");
const rightCol = document.querySelector(".right-col");

document.addEventListener("DOMContentLoaded", function () {
  leftCol.classList.add("animate-left-col");
  rightCol.classList.add("animate-right-col");
});

const elementsArray = document.querySelectorAll(".not-active");

elementsArray.forEach(function (elem) {
  elem.addEventListener("mouseover", function () {
    elem.classList.add("animate");
  });
});
//

// cta section
const textCta = document.querySelector(".cta-text");
let btnCta = document.querySelector(".cta-btn-tiger");
const hideElement = document.getElementById("hide-element");
const leavesElement = document.getElementById("leaves");
// let tigerCta = window.getComputedStyle(btnCta, "::before");
let count = 0;

btnCta.addEventListener("mouseover", function () {
  console.log(count);
  // if (count >= 1) {
  //   btnCta.style.setProperty("--tiger", "hidden");
  // }
  // if (count == 0) {
  count += 1;
  // }
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

const heroImageSun = document.querySelector(".hero-image-sun");
const body = document.querySelector("body");
const btnProjects = document.querySelector(".btn-projects");
const projects = document.querySelector(".projects-grid");
const navItem = document.querySelectorAll(".nav-item");
const focusHighlight = document.querySelector(".focus-highlight");
const activeNavItem = document.querySelector(".active");
const heroImageMoon = document.querySelector(".hero-image-moon");

heroImageSun.addEventListener("click", function () {
  body.classList.add("blackmode-bg", "blackmode-fc");
  btnCta.classList.add("blackmode-fc");
  btnProjects.classList.add("blackmode-bg-opposite", "blackmode-fc-opposite");
  projects.classList.add("blackmode-border-opposite");
  projects.classList.add("blackmode-border");
  focusHighlight.classList.add("blackmode");
  activeNavItem.classList.add("blackmode");

  for (let i = 0; i < navItem.length; i++) {
    navItem[i].classList.add("blackmode-fc", "blackmode");
  }
});

const cardElement = document.querySelectorAll(".card");

const addHoverStateCards = () => {
  cardElement.forEach((card) => {
    const cardTitleElement = card.querySelector(".card h2");
    const cardSvgElement = card.querySelector(".card h2 svg");
    const cardListElements = card.querySelectorAll(".card li");
    card.addEventListener("mouseover", () => {
      card.classList.add("card-hover");
      cardTitleElement.classList.add("h2-hover");
      cardSvgElement.classList.add("svg-hover");
      for (const cardListElement of cardListElements) {
        cardListElement.classList.add("li-hover");
      }
    });
    card.addEventListener("mouseout", () => {
      cardTitleElement.classList.remove("h2-hover");
      cardSvgElement.classList.remove("svg-hover");
      card.classList.remove("card-hover");
    });
  });
};

addHoverStateCards();
