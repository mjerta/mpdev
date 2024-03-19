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
