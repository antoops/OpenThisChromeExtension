// Saves options to chrome.storage
function save_options() {

  var SNURL = document.getElementById('SNURL').value;
  
	chrome.storage.local.set({
    ServiceNowURL: SNURL
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores Service Now url from chrome.storage
function restore_options() {
    chrome.storage.local.get({
    ServiceNowURL: ''
  }, function(items) {
    document.getElementById('SNURL').value = items.ServiceNowURL;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
