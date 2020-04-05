document.getElementById('issueInputForm').addEventListener('submit', submitIssue);


function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  if(!isNaN(description) || !isNaN(assignedTo))
  {
    alert("Provide a string on Description and Assigned To");
    location.reload(); 
  }
  else
  {
    const id = Math.floor(Math.random()*100000000) + '';
    const status = true;

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
  }
  
}

const updateIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issues => parseInt(issues.id) === id);
  currentIssue.status = !(currentIssue.status);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issues => parseInt(issues.id) !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  document.getElementById('issueLength').innerText = issues.length;
  let closedIssues=0;

  for (let i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    let btnColor,btnText,issueStatus,strikeDescription;
    if(status)
    {
      issueStatus = "opened";
      strikeDescription = description;
      btnColor ='btn-warning';
      btnText = 'Close'; 
    }
    else
    {
      issueStatus = "closed";
      strikeDescription =`<strike>${description}</strike>`;
      btnColor ='btn-success';
      btnText = 'Open';
      closedIssues++;
      
    }
    
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${issueStatus} </span></p>
                              <h3 style="overflow-wrap:break-word;"> ${strikeDescription} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p style="overflow-wrap:break-word;"><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a onclick="updateIssue(${id})" class="btn ${btnColor}">${btnText}</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
 
  document.getElementById('closedIssues').innerText =closedIssues;
}
