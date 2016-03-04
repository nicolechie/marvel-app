$(document).ready(function() {
	/*--- Display information modal box ---*/
	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.gotIt").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  
    characterGetRequest();
            
});

	function getId(results) {
		for (var i = 0; i < results.length; i++) {
			var characterId = results[i].id;
    	}
    	return characterId;	
    }
    function showResults(results) {
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			var imgPath = results[i].thumbnail.path;
			var last = imgPath.substr(imgPath.length - 19);
			
			if(last !== 'image_not_available') {
				 var characterThumbnail = results[i].thumbnail.path + '/standard_fantastic' + '.' + results[i].thumbnail.extension;
	            $('#characters').append("<div class='col-lg-2 col-md-3 col-sm-4 col-xs-6 box'><img src=" + characterThumbnail + "></div>");
	    		var characterId = results[i].id;
	    		comicGetRequest(characterId);
			}
    	}
    }
	function characterGetRequest() {
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
    	apikey: 'fe53b28e7625459833f259efa7324a60'
	};
	
	$.ajax({
		url: "http://gateway.marvel.com/v1/public/characters",
		data: request,
		dataType: "json",
		type: "GET"
	})
		.done(function(data){ //this waits for the ajax to return with a succesful promise object
		    showResults(data.data.results);
		    $(".box").click(function() {
      			$(this).toggleClass("selected");
      			$(".overlay").fadeIn(1000);
    		});
		    // getId(data.data.results);
		    // comicGetRequest();
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		// var errorElem = showError(error);
		// $('.search-results').append(errorElem);
	});
};
function comicGetRequest(characterId) {

	var request = { 
    	apikey: 'fe53b28e7625459833f259efa7324a60'
	};
	
	$.ajax({
		url: "http://gateway.marvel.com/v1/public/characters/" + characterId + "/comics",
		data: request,
		dataType: "json",
		type: "GET"
	})
		.done(function(data){
		    // console.log(data);
		 
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		// var errorElem = showError(error);
		// $('.search-results').append(errorElem);
	});
};