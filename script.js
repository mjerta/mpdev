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
    // console.log(option);

    //this is where i can put all the animation and also set a default

    if (mainElement) {
      const options = {};
      let keyFrames;

      if (checker) {
        options.direction = "normal";

        if (option == "nav-mobile") {
          options.delay = 400;
        }
      } else {
        if (option == "nav-mobile") {
          options.delay = 0;
        }
        options.direction = "reverse";
      }
      switch (option) {
        case "line2":
          keyFrames = [
            {
              transform: "translateX(0)",
              width: "1.5rem",
              offset: 0,
            },
            {
              transform: "translateX(-100px)",
              width: "0",
              offset: 1,
            },
          ];
          options.duration = 400;
          options.fill = "forwards";
          options.easing = "linear";
          element.animate(keyFrames, options);
          break;

        case "nav-image-moon":
          keyFrames = [
            {
              transform: "translate(-0px, 0)",
              right: "2.5rem",
              top: "1.5rem",
              width: "3.2505rem",
              height: "3.2505rem",
              fontSize: "2px",
              offset: 0,
            },
            {
              right: "calc(50% - 12rem)",
              top: "9.7rem",
              width: "24rem",
              height: "24rem",
              fontSize: "10px",
              offset: 1,
            },
          ];

          options.duration = 400;
          options.easing = "linear";
          options.fill = "forwards";

          element.animate(keyFrames, options);
          break;

        case "sun":
          keyFrames = [
            {
              offset: 0,
              left: "-3em",
              top: "-1em",
            },
            {
              top: "0rem",
              left: "0",
              offset: 1,
            },
          ];

          options.duration = 400;
          options.easing = "linear";
          options.fill = "forwards";
          element.animate(keyFrames, options);

          break;
        case "nav-mobile":
          keyFrames = [
            {
              opacity: 0,
              offset: 0,
            },
            {
              opacity: 1,
              offset: 1,
            },
          ];

          // options.delay = 400;
          options.duration = 800;
          options.easing = "ease-in-out";
          options.fill = "forwards";
          element.animate(keyFrames, options);
          break;

        case "line1":
          keyFrames = [
            {
              transform: "rotate(0)",
              offset: 0,
            },
            {
              transform: "rotate(45deg)",
              offset: 1,
            },
          ];

          options.duration = 200;
          options.easing = "linear";
          options.fill = "forwards";
          element.animate(keyFrames, options);
          break;
        case "line3":
          keyFrames = [
            {
              transform: "rotate(0)",
              offset: 0,
            },
            {
              transform: "rotate(-45deg)",
              offset: 1,
            },
          ];

          options.duration = 200;
          options.easing = "linear";
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
// HEADLESS API SECTION
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
const url = "https://cms.mpdev.nl/api/project-cards?populate=*";

async function fetchData() {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response);
    throw {
      status: response.status,
      message: "Server responded with an error status",
    };
  }
  const data = await response.json();
  return data;
}
function processData(callback) {
  const arr = callback.data;

  arr.forEach((element) => {
    console.log(element);
    const projectsGrid = document.querySelector(".projects-grid");
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);
    if (element.attributes.image.data != null) {
      const img = document.createElement("img");
      const baseUrl = "https://cms.mpdev.nl";
      const path = element.attributes.image.data.attributes.url;
      const imageUrl = `${baseUrl}${path}`;
      img.setAttribute(`src`, imageUrl);
      img.setAttribute('alt', 'screenshot-website')
      card.appendChild(img);
    }

    const article = document.createElement('article');
    article.classList.add('article-cards')
    card.appendChild(article);
    
    
    const title = document.createElement("h2");
    title.innerText = element.attributes.title;
    const svg = document.createElement("svg");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "13");
    svg.setAttribute("viewBox", "0 0 14 13");
    const path = document.createElement("path");
    path.setAttribute("d", "M13.0651 0.868461C13.0651 0.455027 12.7287 0.119873 12.3137 0.119874L5.55101 0.119874C5.13602 0.119874 4.7996 0.455028 4.7996 0.868461C4.7996 1.28189 5.13602 1.61705 5.55101 1.61705L11.5623 1.61705L11.5623 7.60574C11.5623 8.01918 11.8987 8.35433 12.3137 8.35433C12.7287 8.35433 13.0651 8.01918 13.0651 7.60574L13.0651 0.868461ZM1.53133 12.669L12.845 1.39779L11.7824 0.33913L0.468672 11.6103L1.53133 12.669Z")
    svg.appendChild(path)
    title.appendChild(svg);
    article.appendChild(title);
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = element.attributes.description;
    article.appendChild(description);
    const activity = document.createElement("span");
    activity.classList.add("activity");
    article.appendChild(activity);
    if (element.attributes.activity) {
      activity.classList.remove("activity-inactive");
      activity.classList.add("activity-active");
    } else {
      activity.classList.remove("activity-active");
      activity.classList.add("activity-inactive");
    }
    const categories = element.attributes.project_categories.data;
    const tag = document.createElement("ul");
    if (categories != null) {
      tag.classList.add("languages");
      categories.forEach((element) => {
        const listItem = document.createElement("li");
        listItem.innerText = element.attributes.tag;
        tag.appendChild(listItem);
      });
      card.appendChild(tag);
    }
  });
}

fetchData()
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
