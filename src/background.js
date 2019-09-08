var preventReload = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  preventReload = !preventReload;

  chrome.browserAction.setIcon({
    path : preventReload ? "icons/reload-on.png" : "icons/reload-off.png"
  })

  chrome.tabs.executeScript(tab.id, {
      code: preventReload
      ? `window.onbeforeunload = function() { return 'Prevented reload.' }`
      : `window.onbeforeunload = null`
  });
})
