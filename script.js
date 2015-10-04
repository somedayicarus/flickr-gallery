'use strict';
//global variables
var key = '7b2816bfbe36946e5509027ae6833eda';
var userID = '136638860%40N02';
var photoSetID = '72157659354394871';
var requestURL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + key + '&photoset_id=' + photoSetID + '&user_id=' + userID + '&extras=url_m%2C+description&format=json&nojsoncallback=1';

//ajax request to flickr api
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
    //parse api response
	var parsed = JSON.parse(xhr.responseText);
	var photoSet = parsed.photoset.photo;
	var photoDiv = '';
        var count = 0;
        //loop through json and add content to photoDiv
	for (var i = 0; i < photoSet.length; i+=1) {
            var URL = photoSet[i].url_m;
            var title = photoSet[i].title;
            var alt = photoSet[i].description._content;
            count ++;
            photoDiv += '<div class="flex-item"><a href="#image-' + count + '"><img alt="' + alt + '"src="' + URL + '"></a><div class="overlay" id="image-' + count + '"><img alt="' + alt + '"src="' + URL + '"><div><h2>' + title + '</h2><a href="#image-' + (count - 1) + '"><i class="fa-3x fa fa-caret-left"></i></a><a href="#image-' + (count + 1) + '"><i class="fa-3x fa fa-caret-right"></i></a></div><a href="#" class="lb-close"><i class="fa fa-close fa-lg"></i></a></div></div>';
	}
        //add photoDiv to page
	document.getElementById('photos').innerHTML = photoDiv + '</div>';
        document.getElementById('header').innerHTML = parsed.photoset.title;
    }
};
//open and send ajax request
xhr.open('GET', requestURL, true);
xhr.send();



