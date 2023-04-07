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
let btnCta = document.getElementsByClassName("cta-btn-tiger");
let tigerCta = window.getComputedStyle(btnCta, '::before');
let count = 0;
console.log(tigerCta);

btnCta.addEventListener("mouseover", function () {
  count++;
  if (count > 0) {
    btnCta.style.setProperty('--beforeBack', "green")
  }
  textCta.classList.add("animate-text-cta");
});

btnCta.addEventListener("mouseout", function () {
  // textCta.classList.remove("animate-text-cta")
  //   tigerCta.visibility = "hidden";
});

//
