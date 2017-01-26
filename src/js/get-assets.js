/**
 * Get all asset ids
 */
var getAssets = function() {
  var assets = []
  var download_column, title_column

  // Determine which column contains downloads
  // Because for whatever reason this varies between domain
  $('#Documents tr:first-child th').each(function(index, el) {
    if($(this).html() == 'View') {
      download_column = index + 1
    }
    else if($(this).children('a').html() == 'Description') {
      title_column = index + 1
    }
  })

  // For each download link
  $('#Documents td:nth-child(' + download_column + ') a').each(function(index, el) {
    // Add to list
    assets.push({
      href: window.location.origin + $(this).attr('href'),
      title: $(this).parent().parent().children('td:nth-child(' + title_column + ')').html()
    })
  })
  .promise()
  .done(function() {
    console.log('Planning Application Downloader is downloading:', assets)
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
