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
const btnCta = document.querySelector(".cta button");
const tigerCta = window.getComputedStyle(btnCta, "::before");
console.log(tigerCta);

btnCta.addEventListener("mouseover", function () {
  textCta.classList.add("animate-text-cta");
});

btnCta.addEventListener("mouseout", function () {
  // textCta.classList.remove("animate-text-cta")
  //   tigerCta.visibility = "hidden";
  btnCta.style.setProperty("--afterBack", "hidden");
});

//
