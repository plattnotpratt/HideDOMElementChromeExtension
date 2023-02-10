
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function hideElement(selector){
  document.querySelectorAll(`${selector}`)
  .forEach( el => { 
    el.style.display = "none"; 
    console.log("Completed:", el);
  });
}
document.getElementById('submit-button').addEventListener('click', async function(event) {
  event.preventDefault();
  let selector = document.getElementById('selector').value;
  if (!selector) return;
  let tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    func: hideElement,
    args: [selector],
  });
  
  return selector.value;
});

