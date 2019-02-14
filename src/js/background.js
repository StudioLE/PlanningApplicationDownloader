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
      url: asset.href
    })
  })
}

/**
 * Create download all context menu entry
 */
chrome.contextMenus.create({
  title: 'Planning Application Downloader - Download all files',
  onclick: sendGetAssets,
  documentUrlPatterns: [
    "http://paplan.lbbd.gov.uk/online-applications/*",
    "https://publicaccess.barnet.gov.uk/online-applications/*",
    "http://pa.bexley.gov.uk/online-applications/*",
    "https://planapp.bracknell-forest.gov.uk/online-applications/*",
    "https://pa.brent.gov.uk/online-applications/*",
    "https://searchapplications.bromley.gov.uk/online-applications/*",
    "https://publicaccess3.croydon.gov.uk/online-applications/*",
    "https://pam.ealing.gov.uk/online-applications/*",
    "https://planningandbuildingcontrol.enfield.gov.uk/online-applications/*",
    "https://planning.royalgreenwich.gov.uk/online-applications/*",
    "http://public-access.lbhf.gov.uk/online-applications/*",
    "https://publicaccessapplications.newcastle.gov.uk/online-applications/*",
    "https://pa.newham.gov.uk/online-applications/*",
    "https://planning.lambeth.gov.uk/online-applications/*",
    "https://planning.lewisham.gov.uk/online-applications/*",
    "https://planning.norwich.gov.uk/online-applications/*",
    "https://planning.southwark.gov.uk/online-applications/*",
    "http://planningregister.sutton.gov.uk/online-applications/*",
    "https://development.towerhamlets.gov.uk/online-applications/*",
    "http://idoxpa.westminster.gov.uk/online-applications/*"
  ]
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
