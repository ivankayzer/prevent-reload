var preventReload = false;

chrome.runtime.onMessage.addListener(function(message, data) {
    if (message.type == 'enable') {
      chrome.pageAction.show(data.tab.id);
    }
 });

chrome.pageAction.onClicked.addListener(function(tab) {
  preventReload = !preventReload;

  chrome.pageAction.setIcon({
    path : preventReload ? "icons/reload-on.png" : "icons/reload-off.png",
    tabId: tab.id
  })

  chrome.tabs.executeScript(tab.id, {
      code: preventReload
      ? `window.onbeforeunload = function() { return 'Prevented reload.' }`
      : `window.onbeforeunload = null`
  });
})
