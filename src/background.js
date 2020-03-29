var preventReload = {};

var preventReloadFunc = `window.onbeforeunload = function() { return 'Prevented reload.' }`;

chrome.runtime.onMessage.addListener(function(message, data) {
    if (message.type == 'enable') {
      chrome.pageAction.show(data.tab.id);
    }
 });

chrome.pageAction.onClicked.addListener(function(tab) {
  preventReload[tab.id] = !preventReload[tab.id];

  chrome.pageAction.setIcon({
    path : preventReload[tab.id] ? "icons/reload-on.png" : "icons/reload-off.png",
    tabId: tab.id
  })

  chrome.tabs.executeScript(tab.id, {
      code: preventReload[tab.id]
      ? preventReloadFunc
      : `window.onbeforeunload = null`
  });
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (preventReload[tabId]) {
    chrome.pageAction.show(tabId);

    chrome.pageAction.setIcon({
      path : "icons/reload-on.png",
      tabId: tabId
    })

    chrome.tabs.executeScript(tabId, {
      code: preventReloadFunc
    });
  }
});
