/**
 * Get all asset ids
 */
var getAssets = function() {
  console.log('getAssets() called')
  var assets = []
  // For each item
  $('#Documents td:nth-child(3) a').each(function(index, el) {
    // Add to list
    assets.push({
      href: $(this).attr('href'),
      title: $(this).parent().parent().children('td:nth-child(4)').html()
    })
  })
  .promise()
  .done(function() {
    console.log(assets)
    // Send message to background.js
    chrome.runtime.sendMessage({
      message: 'downloadAssets', 
      assets: assets
    })
  })
}

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'getAssets') {
      getAssets()
    }
    else {
      console.error('Unknown message: ' + request.message)
    }
  }
)
