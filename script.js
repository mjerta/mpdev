const elementsArray = document.querySelectorAll(".not-active");

elementsArray.forEach(function(elem) {
    elem.addEventListener("mouseover", function() {
        //this function does stuff
        elem.classList.add("animate");
    });
});

const  textCta = document.querySelector(".cta-text");
const btnCta = document.querySelector(".cta button");

btnCta.addEventListener("mouseover", function() {

    textCta.classList.add("animate-text-cta")
});

btnCta.addEventListener("mouseout", function() {

    // textCta.classList.remove("animate-text-cta")
});
