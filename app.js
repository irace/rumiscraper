#! /usr/local/bin/node

if (process.argv.length != 3) {
  console.log('Usage: rumiscraper [USERNAME]')
  return
}

var userName = process.argv[2]

require('request')('http://ruminations.com/' + userName, function (err, response, html) {
  if (err) throw err

  $ = require('cheerio').load(html)

  var ruminations = $('.boxs').map(function () {
    var $box = $(this)
    return {
      text: $box.find('.boxs-text').text().trim(),
      points: +$box.find('.boxs-button-points .size-1').text()
    }
  })

  var fileName = userName + '.json';

  require('fs').writeFile(fileName, JSON.stringify(ruminations), function (err) {
    if (err) throw err

    console.log('Saved to ' + fileName)
  })
})