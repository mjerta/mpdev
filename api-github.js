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
  // Defining array to be storing the repo name with the object that belongs with it.
  let arr = [];

  const customHeaders = callback.customHeaders;
  // For loop to loop trough the callback that is an object.
  for (const el of callback.arr) {
    const repoName = el.repoName;
    for (const elInside of el.commitResponse) {
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
      // Eventually every iteration the object is being bush inside the array.
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
  console.log(arr);
  return arr;
}

function processData(callback) {
  // Putting all the data into variables
  const repoNameMostRecent = callback[0].repoName;
  const branchNameMostRecent = callback[0].branchName;
  const commitMostRecent = callback[0].commitData.commit.message.replace(
    /\n/g,
    " "
  );
  const dateCommitAPI = callback[0].commitData.commit.committer.date;

  /*
    Using the getDataAttributes to get all the data-attributes elements.
    This are being to insert the proper text.
  */

  // Defining the variable to get get the object filled with all data-github attributes
  const dataGithub = getDataAttributes("data-github");

  const commitMessage = document.querySelector(
    `[${dataGithub.actionAttribute}=commit-message]`
  );
  const repoName = document.querySelector(
    `[${dataGithub.actionAttribute}=repo-name]`
  );
  const dateCommit = document.querySelector(
    `[${dataGithub.actionAttribute}=date-created]`
  );

  console.log(dateCommit);

  // Inserting the text into the HTML elements
  commitMessage.innerText = commitMostRecent;
  repoName.innerText = repoNameAPI;
  dateCommit.innerText = dateCommitAPI;
  /*
    For each loop of every commit with its corresponded repo name
    This for loop could be use when I want to show other latest commits from other repos
  */
  callback.forEach((element) => {
    /*
      The commit message is being slected. Afterwards the lines from  the format of the data from github is being 
      formatted again.
    */
    const message = element.commitResponse[0].commit.message.replace(
      /\n/g,
      " "
    );
    const dateCommit = element.commitResponse[0].commit.committer.date;
    const repo = callback[0].repoName;
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
