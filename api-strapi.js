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
    // console.log(response);
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
    // console.log(element);
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
      img.setAttribute("alt", "screenshot-website");
      card.appendChild(img);
    }

    const article = document.createElement("article");
    article.classList.add("article-cards");
    card.appendChild(article);

    const title = document.createElement("h2");
    title.innerText = element.attributes.title;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "13");
    svg.setAttribute("viewBox", "0 0 14 13");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M13.0651 0.868461C13.0651 0.455027 12.7287 0.119873 12.3137 0.119874L5.55101 0.119874C5.13602 0.119874 4.7996 0.455028 4.7996 0.868461C4.7996 1.28189 5.13602 1.61705 5.55101 1.61705L11.5623 1.61705L11.5623 7.60574C11.5623 8.01918 11.8987 8.35433 12.3137 8.35433C12.7287 8.35433 13.0651 8.01918 13.0651 7.60574L13.0651 0.868461ZM1.53133 12.669L12.845 1.39779L11.7824 0.33913L0.468672 11.6103L1.53133 12.669Z"
    );
    svg.appendChild(path);
    title.appendChild(svg);
    article.appendChild(title);
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = element.attributes.description;
    article.appendChild(description);
    const status = document.createElement("span");
    status.classList.add("status");
    article.appendChild(status);
    if (element.attributes.status) {
      // console.log(element.attributes.status);
      status.classList.remove("in-progress");
      status.classList.add("completed");
    } else {
      status.classList.remove("completed");
      status.classList.add("in-progress");
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
      article.appendChild(tag);
    }
  });
}

fetchData()
  .then(processData)
  .then(addHoverStateCards)
  .catch((error) => {
    console.log(error);
  });
