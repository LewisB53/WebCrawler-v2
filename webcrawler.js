var request = require('request');
var URL = require('url-parse');
var cheerio = require('cheerio');

var domainName = "http://wiprodigital.com";
var pagesVisited = {};
var pagesToVisit = [];
var url = new URL(domainName);

pagesToVisit.push(domainName);
crawl();


function crawl() {
  var nextPage = pagesToVisit.pop();

  if (nextPage in pagesVisited) {
    crawl();
  } else {
    visitPage(nextPage, crawl);
  }

}


function visitPage(url, callback) {
	request(domainName, function(error, response, body) {

	   if(error) {
	    	console.log("Error: " + error);
	   }


	   if(response.statusCode === 200) {
	   		var $ = cheerio.load(body);
			console.log("Status OK" + response.statusCode);
			collectInternalLinks($);
	   }

	});

}



function collectInternalLinks($) {
  var allLinks = [];
  var allImages = [];


  var links = $("a[href^='http']");
  links.each(function() {
      allLinks.push($(this).attr('href'));
  });


  var images = $("img");
  images.each(function() {
      allImages.push($(this).attr('src'));
  });

  
  console.log(allLinks);
  console.log("Found " + allLinks.length + " links");
  console.log(allImages);
  console.log("Found " + allImages.length + " Images");
  

  require('fs').writeFile(
    './data/data.json',
    JSON.stringify(allLinks + allImages),

    function (err) {
        if (err) {
            console.error('Error writing to XML');
        }
    }
  );
 
}
