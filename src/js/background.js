var planning_portals = []

/**
 * Send getSummary request
 */
var sendGetSummary = function(info, tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Send message to get-summary.js
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'getSummary'
    })
  })
}

/**
 * Send getAssets request
 */
var sendGetAssets = function(info, tab) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Send message to get-assets.js
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'getAssets'
    })
  })

  // Download the application summary as well
  sendGetSummary(info, tab)
}

/**
 * Download assets
 */
var downloadAssets = function(assets) {
  assets.forEach(function(asset) {
    var dl = {
      url: asset.href
    }
    // Use filename if specificed. If not let Chrome handle it.
    if(asset.filename) {
      dl.filename = asset.filename
    }
    chrome.downloads.download(dl)
  })
}

/**
 * Context menu entry for Download All
 */
chrome.contextMenus.create({
  title: 'Download All Application Documents',
  onclick: sendGetAssets,
  documentUrlPatterns: planning_portals
})

/**
 * Context menu entry for Download Summary
 */
chrome.contextMenus.create({
  title: 'Download Application Summary',
  onclick: sendGetSummary,
  documentUrlPatterns: planning_portals
})

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'downloadAssets') {
    downloadAssets(request.assets)
  }
  else {
    alert('Planning Application Downloader: unknown message: ' + request.message)
  }
})
