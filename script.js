// nav section
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
// let tigerCta = window.getComputedStyle(btnCta, "::before");
let count = 0;

btnCta.addEventListener("mouseover", function () {
  console.log(count);
  // if (count >= 1) {
  //   btnCta.style.setProperty("--tiger", "hidden");
  // }
  // if (count == 0) {
  //   count += 1;
  // }
  hideElement.classList.add("hide-element-animation");
  textCta.classList.add("animate-text-cta");
});
