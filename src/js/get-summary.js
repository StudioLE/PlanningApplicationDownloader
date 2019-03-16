/**
 * Get application summary
 */
var getSummary = function() {
  
  console.log('Planning Application Downloader is fetching the application summary')

  var summary = {}

  // Determine the URL of the summary page
  summary.url = window.location.origin + $('#tab_summary').attr('href')

  // Get the summary page
  $.get(summary.url, function(data) {
    // Extract the summary table
    var table = $($.parseHTML(data)).find('#simpleDetailsTable tr').each(function(index, el) {
      var key, value

      // Clean the data
      key = $.trim($(this).find('th').html())
      value = $.trim($(this).find('td').html())
      
      // Store in array
      summary[key] = value
    })

  })
  .done(function(data) {
    console.log(summary)
    
    // Store the summary data as file
    var json = JSON.stringify(summary, undefined, 2)
    var doc = URL.createObjectURL( new Blob([json], {type: 'application/json'}) )

    // Use Reference and Address for the filename. Add a prefix so it appears first.
    var filename = '# ' + summary['Reference'].split('/').join('_')
    filename += ' ' + summary['Address'] + '.json'

    var assets = [{
      href: doc,
      title: 'Application Summary',
      filename: filename
    }]

    console.log('Planning Application Downloader is downloading:', assets)
    
    // Send the asset as a message to background.js to be downloaded
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
    if(request.message === 'getSummary') {
      getSummary()
    }
  }
)
