var animals = ["dog", "cat", "rabbit", "pig", "horse"];

function displayAnimalInfo(){

		var animal = $(this).attr("data-name");
		var query = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&limit=10&api_key=dc6zaTOxFJmzC';

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	


        });



}





function renderButtons() {

		$("#animals-view").empty();

		for (var i = 0; i < animals.length; i++) {
			var createButton = $("<button>");
			createButton.addClass("animal");
			createButton.attr("data-name", animals[i]);
			createButton.text(animals[i]);
			$("#animals-view").append(createButton);

		}
}

		$("#add-animal").on("click", function() {
	 		event.preventDefault();
	 		var animal = $("#animal-input").val().trim();
	 		animals.push(animal);

	 	renderButtons();
      });

		renderButtons();










