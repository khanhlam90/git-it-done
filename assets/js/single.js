var repoNameEl = document.querySelector("#repo-name");

//create the var to append the <a> in displauIssues() to html
var issueContainerEl = document.querySelector("#issues-container");

//create the var to append the message that the repo has more than 30 issues
var limitWarningEl = document.querySelector("#limit-warning");


var getRepoIssues = function(repo) {
  //console.log(repo);
  // format the github api url
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        // pass response data to dom function
        displayIssues(data);

        // check if api has paginated issues
        if (response.headers.get("Link")) {
          // display messafe of more than 30 issues using console.log
          //console.log("repo has more than 30 issues");

          //then, replace the console.log with the function call
          displayWarning(repo);
          
        }
      });
    }
    else {
      console.log(response);
      alert("There was a problem with your request!");
    }
  });
};
  
var displayIssues = function(issues) {
  //dispay message if there is no issue - to tell user that the code is not broken/no confusion
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

   // loop over given issues
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    // test if it works
    //console.log(issueEl);

    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);

    //check if it works
    //console.log(issueEl);

    //append to the dom - append issueEl to the var issueContainerEl 
    issueContainerEl.appendChild(issueEl);
  }
};

// create the var tp let the user know that the repo has more than 30 issues and let them visit the direct github
var displayWarning = function(repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  // create link element
  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};


getRepoIssues("facebook/react");