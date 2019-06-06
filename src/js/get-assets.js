/**
 * Get all asset ids
 */
var getAssets = function() {
  var host = window.location.host
  if(host == 'planningregister.londonlegacy.co.uk') {
    getApasAssets()
  }
  else {
    getIdoxAssets()
  }
}

/**
 * Get all asset ids for Idox pages
 */
var getIdoxAssets = function() {
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
 * Get all asset ids for Apas pages
 */
var getApasAssets = function() {
  var assets = []
  var download_column = 2
  var deferreds = []

  // Change to show all downloads
  // @todo fix this
  $('#tableMedia_length select').val(-1).trigger('change')

  // For each download link
  $('#tableMedia td:nth-child(' + download_column + ') a').each(function(index, el) {
    // Get the sequence and APN key from the href url
    // var seq = urlParam($(this).attr('href').substr(25), 'theSeqNo')
    // var apn = urlParam($(this).attr('href').substr(25), 'theApnkey')

    // Extract the file extension from the end of the file name
    // var file = $(this).html().split('.')
    // var ext = file[file.length - 1]

    var asset = {
      url: window.location.origin + '/swift/apas/run/' + $(this).attr('href'),
      // href: window.location.origin + '/swift/MediaTemp/' + apn + '-' + seq + '.' + ext,
      title: $(this).html(),
      filename: $(this).html()
    }

    //@todo open page
    // href: window.location.origin + '/swift/apas/run/' + $(this).attr('href'),
    // before download. THis might trigger it to be loaded?
    // Fetch the href URL to ensure APAS has prepared the file for downloading.
    // var url = 
    deferreds.push(
      $.get(asset.url, function(data) {
        // Example of data:
        // <meta http-equiv="Refresh" content="0; URL=../../MediaTemp/7386-126155.pdf">

        // Extract download url from href:
        asset.href = window.location.origin + '/swift/' + data.substr(49, data.length - 49 - 2)

        // Add asset to list
        assets.push(asset)
      })
    )
  })

  $.when.apply(null, deferreds).done(function() {
    console.log('Planning Application Downloader is downloading:', assets)
    // Send message to background.js
    chrome.runtime.sendMessage({
      message: 'downloadAssets',
      assets: assets
    })
  })
}

// https://stackoverflow.com/questions/7731778/get-query-string-parameters-url-values-with-jquery-javascript-querystring\
// var urlParam = function(str, name) {
//   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(str)
//   return (results !== null) ? results[1] || 0 : false;
// }

/**
 * Message listener
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === 'getAssets') {
    getAssets()
  }
})
