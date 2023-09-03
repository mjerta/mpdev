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

const addHoverStateCards = () => {
  const cardElements = document.querySelectorAll(".card");

  // The loop below will add an eventlistener for each
  // of the card available in the projects
  cardElements.forEach((cardElement) => {
    const cardTitleElement = cardElement.querySelector(".card h2");
    const cardSvgElement = cardElement.querySelector(".card h2 svg");
    const cardListElements = cardElement.querySelectorAll(".card li");
    cardElement.addEventListener("mouseover", () => {
      const check = cardElement.classList.contains("card-hover");
      cardElement.classList.add("card-hover");
      // for loop to check which card is not been hovered over
      // this for loop is need to be able to show which one is not selected
      // while the one that is hovered over
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
      //this for loop will remove the card-opacity class
      // for the ones that was not hovered over
      // this time it has been executed before the card-hover classlist remove
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
  }); //end of foreach
};

function enableAnimation(target) {
  const setTarget = getDataAttributes(target);
  if (setTarget) {
    const runTarget = setTarget.find(
      (item) => item.dataset.nav == "hamburger-menu"
    );
    let reverse = false;
    runTarget.addEventListener("click", () => {
      reverse = !reverse;
      setTarget.forEach((element) => {
        if (reverse) {
          element.classList.remove("animation-reverse");
          element.classList.add("animation");
        } else {
          element.classList.remove("animation");
          element.classList.add("animation-reverse");
        }
      });
    });
  }
}

// enableAnimation("data-nav");

addHoverStateCards();

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

function getDataAttributes(actionAttribute) {
  if (actionAttribute) {
    const nodeList = document.querySelectorAll(`[${actionAttribute}]`);
    if (nodeList.length != 0) {
      return { nodeList, actionAttribute };
    } else {
      console.log("This attribute does not exist");
    }
  }
}

function addAnimation(mainElement, attributeValue, checker) {
  let selectOtherElements = mainElement.getAttribute(attributeValue);
  const nodeList = document.querySelectorAll(`[data-${selectOtherElements}]`);
  nodeList.forEach((element) => {
    const option = element.getAttribute(`data-${selectOtherElements}`);

    // to see all options
    console.log(option);

    //this is where i can put all the animation and also set a default

    if (mainElement) {
      const options = {};
      let keyFrames;

      if (checker) {
        options.direction = "normal";
      } else {
        options.direction = "reverse";
      }
      switch (option) {
        case "line2":
          keyFrames = [
            {
              transform: "translateX(0)",
              width: "33px",
              height: "3.8px",
              offset: 0,
            },
            {
              transform: "translateX(-100px)",
              width: "3.8px",
              height: "3.8px",
              offset: 0.5,
            },
            {
              transform: "translateY(100px) translateX(-100px)",
              width: "3.8px",
              height: "33px",
              offset: 1,
            },
          ];
          options.duration = 400;
          options.fill = "forwards";
          options.easing = "linear";
          element.animate(keyFrames, options);
          break;

        case "nav-image-moon":
          console.log("test");

          keyFrames = [
            {
              transform: "translate(-0px, 0)",
              right: "2.5rem",
              top: "1.5rem",
              // left: 0,
              width: "3.2505rem",
              height: "3.2505rem",
              offset: 0,
            },
            {
              // transform: "translate(-50%,0)",
              right: "calc(50% - 12rem)",
              top: "9.7rem",
              width: "24rem",
              height: "24rem",
              offset: 1,
            },
          ];

          options.duration = 400;
          option.easing - "linear";
          options.fill = "forwards";

          element.animate(keyFrames, options);
          break;
      }
    }
  });
}

function enableAnimation(callback) {
  let checker = false;
  //defining all the kind of attributes that would represent an action or default browser loadinbg
  const clickElements = callback("data-click");
  if (clickElements) {
    clickElements.nodeList.forEach((mainElement) => {
      mainElement.addEventListener("click", () => {
        checker = !checker;
        addAnimation(mainElement, clickElements.actionAttribute, checker);
      });
      // element.click();
      checker = !checker;
    });
  }
}
enableAnimation(getDataAttributes);

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
