// $(document).ready(function() {
      var animals = ["giraffe", "elephant", "cat", "turtle", "ninja"];

      function displayAnimalInfo() {

        var animal = $(this).attr("animal-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dffda269cd1a4ec9aee6e2dc6f38ca36&q=" + animal +"&limit=10&offset=3&rating=PG&lang=en"

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response.data);
          // create a div to hold animal pictures
          var animalDiv = $("<div class='animal-name'>")
          //store the rating data
          var rating = response.data.rating;
          //create an element to have the rating displayed
          var p = $("<p>").text("Rating: " + rating);
          // append the p variable to the animalDiv
          animalDiv.append(p);
          // store the fixed image of the GIF
          var imgURL = response.data.images.fixed_height_still;
          // create an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // append the image
          animalDiv.append(image);
          //put the entire movie above the previous movies
          $("#animal-view").prepend(animalDiv);
      });
    }

    function renderButtons() {
      $("#animal-view").empty();

      for (var i = 0; i < animals.length; i++){
        var a = $("<button>");
        a.addClass("animal");
        a.attr("animal-name", animals[i]);
        a.text(animals[i]);
        $("#animal-buttons").append(a);
      }
    }

    $("#addAnimal").on("click", function(event) {
      event.preventDefault();

      var animal = $("#animal-input").val().trim();

      animals.push(animal);

      renderButtons();
    });

    $(document).on("click", ".animal", displayAnimalInfo);

    renderButtons();
