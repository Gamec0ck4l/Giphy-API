var celebrities = ["Leonardo Dicaprio", "Will Smith", "Donald Trump"]; 

// Function to display celebrity data
function renderButtons() {

	$("#celebrity-view").empty();                              // Empties the div holding the buttons so they won't repeat

	for (var i = 0; i < celebrities.length; i++) {             // Looping arrary of celebrities
		var createButton = $("<button>");                        // Creates button for each celebrity in the array
		createButton.addClass("celebrity");                      // Adding class of "celebrity" to each button
		createButton.attr("data-name", celebrities[i]);          // Adding attribute of data-name to each button
		createButton.text(celebrities[i]);                       // Adding the text to each button
		$("#celebrity-view").append(createButton);               // Adds buttons to the div hold the buttons
	}
}
  
	$("#add-celebrity").on("click", function() {               // Function when the Submit button is clicked                        
 		event.preventDefault();                                  
 		var celebrity = $("#celebrity-input").val().trim();      // Gets the value from the input field
 		celebrities.push(celebrity);                             // Puses the value to the end of the array

 	renderButtons();                                           // Calls function to process array                      
    });

	renderButtons()                                            // Calls function to display the fist set of buttons                                                                          

 // Function to pull API data and displays it
function displayCelebrityInfo() {

  $("#gif-display").empty();                                 // Empties the div holding the gifs 
  var celebrity = $(this).attr("data-name");                 //  
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    celebrity + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({                                                    // Ajax call with the queryURL 
      url: queryURL,
      method: "GET"
    })
    
    .done(function(response) {                                // Data gets retreived 
      var results = response.data;                            // Data gets stored in results variable

      for (var i = 0; i < results.length; i++) {              // Loops throught each item in the data

        var celebrityDiv = $("<div>");                        // Creates a div tag    
        var celebrityImage = $("<img>");                      // Creates an img tag
        var celebrityRating = $("<p>").text("Rating: " + results[i].rating);          // Creates a paragraph tag displaying the rating

        celebrityImage.attr("src", results[i].images.fixed_height_still.url);         // Adding src attribute with the still URL for each image
        celebrityImage.attr("data-still", results[i].images.fixed_height_still.url);  // Adding data-still with the still URL attributes each image for each image
        celebrityImage.attr("data-animate", results[i].images.fixed_height.url);      // Adding data-animate attributes with the animated URL to each image        
        celebrityImage.attr("data-state", "still");                                   // Adding data-state called still to each image
        celebrityImage.attr("class", "gif");                                          // Adding class called gif to each image

        celebrityDiv.append(celebrityRating);                 // Displays the rating to the celebrityDiv    
        celebrityDiv.append(celebrityImage);                  // Displays the image to the celebrityDiv
        $("#gif-display").prepend(celebrityDiv);              // Displays the celebrityDiv within the div called gif-display
      }

      // Animating gifs
      $(".gif").on("click", function() {                      // Function when an image is clicked 
      var state = $(this).attr("data-state");                 // Allow to get any attribute on our HTML element
        if (state === "still") {                              // If the clicked image's state is still...
          $(this).attr("src", $(this).attr("data-animate"));  // Update it's src attribute to data-animate attribute
          $(this).attr("data-state", "animate");              // Then set the image's data-state to animate
        } else {
          $(this).attr("src", $(this).attr("data-still"));    // Update it's src attribute to data-animate attribute 
          $(this).attr("data-state", "still");                // Then set the image's data-state to still
        }
      });
  });
}

 $(document).on("click", ".celebrity", displayCelebrityInfo); /* Adding click listener to all button elements with a class
                                                                  of "celebrity" which runs the function displayCelebrityInfo */





