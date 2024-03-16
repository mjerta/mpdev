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
              top: "9.4rem",
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
  //defining all the kind of attributes that would represent an action or default browser loading
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
