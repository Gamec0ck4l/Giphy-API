var animals = ["dog", "cat", "rabbit", "pig", "horse"];


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

		renderButtons()

///////////////////////////////////////////

 $("button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
          }
        });
    });








