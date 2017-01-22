/**
 * Send getAssets request
 */
var sendGetAssets = function(info, tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Send message to content.js
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'getAssets'
    })
  })
}

/**
 * Download assets
 */
var downloadAssets = function(assets) {
  assets.forEach(function(asset) {
    console.log(asset)
    chrome.downloads.download({
      url: 'http://idoxpa.westminster.gov.uk' + asset.href
    })
  })
}

/**
 * Create download all context menu entry
 */
chrome.contextMenus.create({
 title: 'Planning Application Downloader - Download all files',
 onclick: sendGetAssets
})

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'downloadAssets') {
      downloadAssets(request.assets)
    }
    else {
      alert('Planning Application Downloader: unknown message: ' + request.message)
    }
  }
)
