"use strict";
$(document).ready(function() {

     
	$('#search').on('click', function(e) {
		e.preventDefault();
		$('.poster').empty();
		$('.search_results').empty();
		var userInput = $('#searchTerm').val();
		

		console.log(userInput);
		//searching for the movie and get the result back
		var request = $.ajax({
			url: "http://www.omdbapi.com",
			type: "get",
			dataType: "json",
			data: {
				s: userInput
			}

		}); // ajax request

		var response = request.done(function(data) {


			$.each(data["Search"], function(index, movie) {

				var li = $("<li data-imdbid= "+movie["imdbID"] +">" + movie["Title"] + "   " + movie["Year"] + "</li>");

				li.data();

				$('.search_results').append(li);

			});

		});  // request done handler

	}); // search click handler


	//getting the poster 
	$('.search_results').delegate("li", "click", function(e) {
		$('.poster').empty();
		var imdbid = $(e.target).data("imdbid");
		console.log(imdbid);
		var request = {
			url: "http://www.omdbapi.com",
			type: "get",
			dataType: "json",
			data: {
				i: imdbid
			}

		};
		var response = $.ajax(request)
		response.done(function(data) {
			$(".poster").append("<img src = '"+ data["Poster"]+"'>");
		});
	}); // poster click handler


});