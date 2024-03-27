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

function createExcert(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function calculateFullHeight(element) {
  const elementToCalculate = document.querySelector(element);
  const getComputedStyle = window.getComputedStyle(elementToCalculate);
  const height = parseFloat(getComputedStyle.height);
  return height;
}

function changeTopElement(element, direction, amount) {
  const elementToChange = document.querySelector(element);
  if (direction == true) {
    elementToChange.style.top = `${amount}px`;
  } else if (direction == false) {
    elementToChange.style.top = `-${amount}px`;
  }
}
