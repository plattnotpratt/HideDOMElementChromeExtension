/**
 * Gets the users current tab from chrome and returns it.
 * @returns tabElement
 */
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/**
 * Function that adds the display none style to all elements with a matching selector
 * @param {String} selector 
 */
function hideElement(selector){
  document.querySelectorAll(`${selector}`)
  .forEach( el => { 
    el.style.display = "none"; 
    console.log("Completed:", el);
  });
}

/**
 * Click handler that listens for a submit and applies the display:none style to all elements with that selector
 */
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

