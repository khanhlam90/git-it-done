//create the var to append the <a> in displauIssues() to html
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
  console.log(repo);
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        // pass response data to dom function
        displayIssues(data);
      });
    }
    else {
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

    //append issueEl to the var issueContainerEl 
    issueContainerEl.appendChild(issueEl);
  }
  

};

getRepoIssues("facebook/react");