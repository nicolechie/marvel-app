$(document).ready(function() {
	var characters = {};
	var boxCount = 0;
	$('.results').hide();
	$('.directions').hide();
	/*--- Display information modal box ---*/
	$(".what").click(function(){
		$('.results').hide();
		$('.directions').show();
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.gotIt").click(function(){
  		$(".overlay").fadeOut(1000);
  		$('.directions').fadeOut(1000);
  	});
  
    characterGetRequest();
            
});

    function showResults(results) {
		// console.log(results);
		for (var i = 0; i < results.length; i++) {
			var imgPath = results[i].thumbnail.path;
			var lastChars = imgPath.substr(imgPath.length - 19);
			var characterName = results[i].name;
			var characterThumbnail = results[i].thumbnail.path + '/standard_fantastic' + '.' + results[i].thumbnail.extension;
			var characterThumbnailSmall = results[i].thumbnail.path + '/standard_medium' + '.' + results[i].thumbnail.extension;
			var characterId = results[i].id;
			characters[characterId] = {
				name: characterName,
			 	id: characterId,
			 	thumbnail: characterThumbnail,
			 	thumbnailSmall: characterThumbnailSmall,
			 	count: null
			}
		
	
			if(lastChars !== 'image_not_available') {
	            $('#characters').append("<div class='col-lg-2 col-md-3 col-sm-4 col-xs-6 box' value = " + characterId + "><img src=" + characterThumbnail + "></div>");
			}
	

			// comicGetRequest(characterId);
    	}
    }
      function compareTotals(characterId) {
    	if (characters[characterId].count > characters[$('#countOne').attr("value")].count) {
    		$('#winner').html(characters[characterId].name + ' is the winner!');
    	}
    	else if (characters[characterId].count === characters[$('#countOne').attr("value")].count) {
    		$('#winner').html('It is a tie!');
    	}
    	else {
    		$('#winner').html(characters[$('#countOne').attr("value")].name + ' is the winner!');
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
		    var boxCount = 0;
		    $(".box").click(function() {
		    	var characterId = $(this).attr("value");
      				if (characters[characterId].count === null) {
      				comicGetRequest(characterId);
      				}
      				else {
      				showTotals(characterId);
		    		compareTotals(characterId);
      				}
		    	if (boxCount === 1) {
		    		$(".overlay").fadeIn(1000);
		    		$("a.gotIt").click(function(){
  						$(".overlay").fadeOut(1000);
  						boxCount = 0;
  						$('.results div').html('');
  					});
		    	}
		    	else {
			    	$(this).toggleClass("selected");
			    	boxCount+=1;
      			}
    		});
		  
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		// var errorElem = showError(error);
		// $('.search-results').append(errorElem);
	});
};
function showTotals(characterId) {
	$('.results').append('<img src=' + characters[characterId].thumbnailSmall + '><p>' + characters[characterId].name + ': <span id="countOne" value=' + characterId + '>' + characters[characterId].count + '</span></p>');
	$('.results').show();
}
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
			characters[characterId].count = data.data.total
			showTotals(characterId);
				console.log(characters[characterId].count);
		    		console.log(characters[$('#countOne').attr("value")].count);
		    		compareTotals(characterId);
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		// var errorElem = showError(error);
		// $('.search-results').append(errorElem);
	});
};