async function fetchGetGithubRepos() {
  const owner = "mjerta";
  const apiUrlGithub = `https://api.github.com/users/mjerta/repos`;
  const apiUrlStrapi = `https://cms.mpdev.nl/api/tests/1`;

  //Fetch API strapi
  const responseStrapi = await fetch(apiUrlStrapi);
  if (!responseStrapi.ok) {
    throw {
      status: response.status,
      message: "Server responded with an error status",
    };
  }
  const dataStrapi = await responseStrapi.json();
  const token = dataStrapi.data.attributes.Token;

  const customHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  // Fetch API
  const response = await fetch(apiUrlGithub, { headers: customHeaders });
  if (!response.ok) {
    throw {
      status: response.status,
      message: "Server responded with an error status",
    };
  }
  const data = await response.json();
  // Returning data fetch API, username and customheaders in an object to be used in an callback.
  return { data, owner, customHeaders };
}

async function fetchGithubBranches(callback) {
  let arr = [];
  const customHeaders = callback.customHeaders;
  for (const el of callback.data) {
    let dataFromApi = {};
    const apiUrlGithub = `https://api.github.com/repos/${callback.owner}/${el.name}/branches`;
    const response = await fetch(apiUrlGithub, {
      headers: callback.customHeaders,
    });
    if (!response.ok) {
      throw {
        status: response.status,
        message: "Server responded with an error status",
      };
    }
    dataFromApi.commitResponse = await response.json();
    dataFromApi.repoName = el.name;
    arr.push(dataFromApi);
  }
  return { arr, customHeaders };
}

async function fetchGetGithubCommits(callback) {
  const githubCommits = document.querySelector(".github a");
  const listItem = document.createElement("p");
  githubCommits.appendChild(listItem);

  // Defining array to be storing the repo name with the object that belongs with it.
  let arr = [];
  let countArr = callback.arr.length;
  let countRepoWaitTime = 0;
  const countBetween = 1 / (countArr / 100);

  // For loop to loop trough the callback that is an object.
  for (const el of callback.arr) {
    let outerIterations = countRepoWaitTime / (countArr / 100);
    // console.log(outerIterations);
    countRepoWaitTime++;
    let totalBranches = el.commitResponse.length;
    const repoName = el.repoName;

    for (const elInside of el.commitResponse) {
      let innerIterations = countBetween / totalBranches;
      // console.log(innerIterations);
      let dataFromApi = {};
      const response = await fetch(elInside.commit.url, {
        headers: callback.customHeaders,
      });

      if (!response.ok) {
        throw {
          status: response.status,
          message: "Server responded with an error status",
        };
      }
      // Object is being filled with an commit, branch & reponame.
      dataFromApi.repoName = repoName;
      dataFromApi.branchName = elInside.name;
      dataFromApi.commitData = await response.json();

      outerIterations += innerIterations;
      console.log(outerIterations);
      listItem.textContent = Math.round(outerIterations);
      if (outerIterations == 100) {
        githubCommits.removeChild(listItem);
      }
      arr.push(dataFromApi);
    }
  }

  /*  
    This function is being used to sort all latest from all repos together. That means that every date is being 
    looked at and being sorted descentently.
    You can change the a and b to change the sorting direction.
  */
  const sortedArray = arr.sort(function (a, b) {
    return (
      new Date(b.commitData.commit.committer.date) -
      new Date(a.commitData.commit.committer.date)
    );
  });
  return arr;
}

function processData(callback) {
  const textInsideFullCommitMessage = document.querySelector(
    ".text-inside-full-commmit-message"
  );
  console.log(textInsideFullCommitMessage);
  // Putting all the data into variables, the first entry of the array will be used to get the most recent commit
  const repoNameMostRecent = callback[0].repoName;
  const branchNameMostRecent = callback[0].branchName;

  /*
  The commit message is being slected. Afterwards the lines from  
    the format of the data from github is being 
    formatted again.
    */
  const commitMostRecent = callback[0].commitData.commit.message.replace(
    /\n/g,
    " "
  );
  const dateCommitAPI = callback[0].commitData.commit.committer.date;

  // Defining the variable to get get the object filled with all elements
  const githubCommits = document.querySelector(".github-commits");

  // The github-commits-loaded will be added to make sure the transition will be done
  // after api data has been loaded
  githubCommits.classList.add("github-commits-loaded");
  for (let i = 0; i <= 3; i++) {
    const listItem = document.createElement("li");
    console.log(listItem);
    githubCommits.appendChild(listItem);

    let span = document.createElement("span");
    // Inserting the text into the HTML elements
    if (i == 0) {
      listItem.classList.add("latest-commit-excerpt");
      const textBeforeCommitMessageExcerpt =
        document.createTextNode("Latest commit: ");
      listItem.appendChild(textBeforeCommitMessageExcerpt);
      listItem.appendChild(span);
      textInsideFullCommitMessage.textContent = commitMostRecent;

      //create excert for the text preventing it too be too long
      const excertedCommitMessage = createExcert(commitMostRecent, 30);
      console.log(excertedCommitMessage);
      span.innerText = excertedCommitMessage;
    } else if (i == 1) {
      const textBeforeCommitMessage = document.createTextNode("Repo name: ");
      listItem.appendChild(textBeforeCommitMessage);
      listItem.appendChild(span);
      span.innerText = repoNameMostRecent;
    } else if (i == 2) {
      const textBeforeCommitMessage = document.createTextNode("branch name: ");
      listItem.appendChild(textBeforeCommitMessage);
      listItem.appendChild(span);
      span.innerText = branchNameMostRecent;
    } else if (i == 3) {
      const textBeforeCommitMessage = document.createTextNode("Date: ");
      listItem.appendChild(textBeforeCommitMessage);
      listItem.appendChild(span);
      span.innerText = dateCommitAPI;
    }
  }

  /*
    For each loop of every commit with its corresponded repo name
    This for loop could be use when I want to show other latest commits from other repos
    */
  callback.forEach((element) => {
    const repo = element.repoName;
    const branchName = element.branchName;

    /*
      The commit message is being slected. Afterwards the lines from  the format of the data from github is being 
      formatted again.
    */
    const message = element.commitData.commit.message.replace(/\n/g, " ");
    const dateCommit = element.commitData.commit.committer.date;
    /*
   console.log(message);
   console.log(repo);
   console.log(branchName);
   console.log(dateCommit);
   */
  });

  const githubTextBalloon = document.querySelector(".full-commit-message");
  const latestCommitExcerpt = document.querySelector(".latest-commit-excerpt");
  console.log(latestCommitExcerpt);

  latestCommitExcerpt.addEventListener("mouseover", () => {
    githubTextBalloon.classList.add("show");
  });
  latestCommitExcerpt.addEventListener("mouseout", () => {
    githubTextBalloon.classList.remove("show");
  });
}

/* 
  All the functions are being called and the return data are being used with thm inside callback function.
  Eventually all error are being catched to make sure it is not hindering the performance and look of the website
*/
fetchGetGithubRepos()
  .then(fetchGithubBranches)
  .then(fetchGetGithubCommits)
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
