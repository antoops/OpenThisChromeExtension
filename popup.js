/**
 * Get the Service Now specific URL.
 * @param {function(string)} callback - called when the URL for the item is created
 **/
function getIncidentURL(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  var SNUrl = '';
  chrome.storage.local.get({
    ServiceNowURL: ''
  }, function(items) {
    SNUrl = items.ServiceNowURL;
  });
  
  
// Calling tabs.query for getting info and delaying for accepting the incident number from User
  chrome.tabs.query(queryInfo, function(tabs) {
  // Prompting for ServiceNow number to proceed with a default value of incident
     var incidentNumber = prompt("Please enter Service Now Info", "INC2312538");
	 var OpenString;
		 
	 // Deciding whether the entered number is Incident/ChangeRequest/Problem
	 if (incidentNumber.search(/inc/i) != -1)
		{
			// 1. Incident : Setting url continuation for an incident 
			OpenString = "incident.do?sys_id=";
		} 
	else if (incidentNumber.search(/chg/i) != -1) 
		{
			// 2. Change : Setting url continuation for an Change request  
			OpenString = "change_request.do?sys_id=";
		} 
	else if (incidentNumber.search(/ctask/i) != -1) 
		{
			// 3. Change task : Setting url continuation for an change task
			OpenString = "change_task.do?sys_id=";
		} 
	else if (incidentNumber.search(/prb/i) != -1) 
		{
			// 4. Problem  : Setting URL continuation for an problem   
			OpenString = "problem.do?sys_id=";
		} 
	else if (incidentNumber.search(/ptask/i) != -1) 
		{
			// 5. problem task : Setting url continuation for an problem task  
			OpenString = "u_problem_task.do?sys_id=";
		} 
	else if (incidentNumber.search(/task/i) != -1) 
		{
			// 6. Catalogue task : Setting url continuation for an catalogue request  
			OpenString = "sc_task.do?sys_id=";
		} 
	else if (incidentNumber.search(/req/i) != -1) 
		{
			// 7. Request task : Setting url continuation for an request task
			OpenString = "sc_request.do?sys_id=";
		} 		
	else {
			// 8. default string for search 
			OpenString = "textsearch.do?sysparm_view=text_search&sysparm_search=";
		}
	 
	 var NewURL = SNUrl + OpenString + encodeURIComponent(incidentNumber);

    callback(NewURL);
  }); 
}

//Adding event listener for creating incident url
document.addEventListener('DOMContentLoaded', function() {
  getIncidentURL(function(url) {
//Create new tab with incident URL
	chrome.tabs.create({ url: url });
   
  });
});
