async function fetchGetGithubRepos() {
  const owner = "mjerta";
  const apiUrl = `https://api.github.com/users/mjerta/repos`;
  const token =
    "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";
  const customHeaders = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  // Fetch API
  const response = await fetch(apiUrl, { headers: customHeaders });
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

async function fetchGetGithubCommits(callback) {
  // Defining array to be storing the repo name with the object that belongs with it.
  let arr = [];

  // For loop to loop trough the callback that is an object.
  for (const el of callback.data) {
    let dataFromApi = {};
    const apiUrl = `https://api.github.com/repos/${callback.owner}/${el.name}/commits?per_page=1`;
    const response = await fetch(apiUrl, { headers: callback.customHeaders });
    if (!response.ok) {
      throw {
        status: response.status,
        message: "Server responded with an error status",
      };
    }

    // Object is being filled with an commitResponse and RepoName.
    dataFromApi.commitResponse = await response.json();
    dataFromApi.repoName = el.name;

    // Eventually every iteration the object is being bush inside the array.
    arr.push(dataFromApi);
  }

  /*  
    This function is being used to sort all latest from all repos together. That means that every date is being 
    looked at and being sorted descentently.
    You can change the a and b to change the sorting direction.
  */
  const sortedArray = arr.sort(function (a, b) {
    return (
      new Date(b.commitResponse[0].commit.committer.date) -
      new Date(a.commitResponse[0].commit.committer.date)
    );
  });
  return arr;
}

function processData(callback) {
  // For each loop of every commit with its corresponded repo name
  callback.forEach((element) => {
    /*
      The commit message is being slected. Afterwards the lines from  the format of the data from github is being 
      formatted again.
    */
    const message = element.commitResponse[0].commit.message;
    const trimmedMessage = message.replace(/\n/g, " ");
    const dateCommit = element.commitResponse[0].commit.committer.date;
    const repo = element.repoName;

    const githubData = getDataAttributes("data-github");
    const commitMessage = document.querySelector(
      `[${githubData.actionAttribute}=commit-message]`
    );
    const repoName = document.querySelector(
      `[${githubData.actionAttribute}=repo-name]`
    );
    const dateCreated = document.querySelector(
      `[${githubData.actionAttribute}=date-created]`
    );
    console.log(commitMessage);
    console.log(repoName);
    console.log(dateCreated);

    // console.log(`Latest commit ${trimmedMessage}: `);
    // console.log(`Repo name ${repo}`);
    // console.log(dateCommit);
  });
}

/* 
  All the functions are being called and the return data are being used with thm inside callback function.
  Eventually all error are being catched to make sure it is not hindering the performance and look of the website
*/
fetchGetGithubRepos()
  .then(fetchGetGithubCommits)
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
