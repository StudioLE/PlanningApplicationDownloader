var planning_portals = [
  'http://paplan.lbbd.gov.uk/online-applications/*',
  'https://publicaccess.barnet.gov.uk/online-applications/*',
  'http://pa.bexley.gov.uk/online-applications/*',
  'https://planapp.bracknell-forest.gov.uk/online-applications/*',
  'https://pa.brent.gov.uk/online-applications/*',
  'https://searchapplications.bromley.gov.uk/online-applications/*',
  'https://publicaccess3.croydon.gov.uk/online-applications/*',
  'https://pam.ealing.gov.uk/online-applications/*',
  'https://citydev-portal.edinburgh.gov.uk/idoxpa-web/*',
  'https://planningandbuildingcontrol.enfield.gov.uk/online-applications/*',
  'https://planning.royalgreenwich.gov.uk/online-applications/*',
  'http://public-access.lbhf.gov.uk/online-applications/*',
  'https://pa.manchester.gov.uk/online-applications/*',
  'https://publicaccessapplications.newcastle.gov.uk/online-applications/*',
  'https://pa.newham.gov.uk/online-applications/*',
  'https://planning.lambeth.gov.uk/online-applications/*',
  'https://planning.lewisham.gov.uk/online-applications/*',
  'https://planning.norwich.gov.uk/online-applications/*',
  'https://planning.southwark.gov.uk/online-applications/*',
  'http://planningregister.sutton.gov.uk/online-applications/*',
  'https://development.towerhamlets.gov.uk/online-applications/*',
  'https://idoxpa.westminster.gov.uk/online-applications/*'
]

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
