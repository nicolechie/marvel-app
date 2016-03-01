$(document).ready(function() {
  $.getJSON('http://gateway.marvel.com:80/v1/public/characters?apikey=fe53b28e7625459833f259efa7324a60', function(data){
    console.log(data);

    function showResults(items) {
        $('#search-results').html("");
		for (var i = 0; i < items.length; i++) {
            var videoThumbnail = items[i].results.thumbnail.path + 'portrait_small.jpg';
            $('#search-results').append('<li><img src =' + videoThumbnail + '></li>');
    	}
    }
    $(function(){
        $('#search-term').submit(function(e) {
            var searchTerm = $('#query').val();
            e.preventDefault();
            getRequest(searchTerm);
        });
    })
  });

function getRequest(searchTerm) {
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
		.done(function(data){ //this waits for the ajax to return with a succesful promise object
		    console.log(data);
		})
	};
});