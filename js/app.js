$(document).ready(function() {
  $.getJSON('http://gateway.marvel.com:80/v1/public/characters?apikey=fe53b28e7625459833f259efa7324a60', function(data){
    console.log(data);
  });

function getInspiration(answerers) {
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
    apikey: fe53b28e7625459833f259efa7324a60
	};
	
	$.ajax({
		url: "http://gateway.marvel.com/v1/public/characters",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})
		.done(function(result){ //this waits for the ajax to return with a succesful promise object
		    console.log(result);
		})
	};
});