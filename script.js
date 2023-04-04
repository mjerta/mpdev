const elementsArray = document.querySelectorAll(".not-active");

elementsArray.forEach(function(elem) {
    elem.addEventListener("mouseover", function() {
        //this function does stuff
        console.log(elementsArray)
        elem.classList.add("animate");
    });
});