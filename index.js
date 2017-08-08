// $(document).ready(function() {
      var animals = ["giraffe", "elephant", "cat", "turtle", "ninja"];

      function displayAnimalInfo() {
        $("#animal-view").empty();
        var animal = $(this).attr("animal-name");
        console.log(animal);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dffda269cd1a4ec9aee6e2dc6f38ca36&q="+ animal + "&limit=10&offset=0&rating=G&lang=en"

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response.data);

          var results = response.data;

            for (var j = 0; j <results.length; j++ ){
              console.log(results);
          // create a div to hold animal pictures
          var animalDiv = $("<div class='animal-name'>")
          //store the rating data
          var rating = results[j].rating;
          //create an element to have the rating displayed
          var p = $("<p>").text("Rating: " + rating);
          // append the p variable to the animalDiv
          animalDiv.append(p);
          // store the fixed image of the GIF
          var imgURL = results[j].images.fixed_height.url;
          // create an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // append the image
          animalDiv.append(image);
          //put the entire movie above the previous movies
          $("#animal-view").prepend(animalDiv);
        }
      });
    }

    function renderButtons() {

      $("#animal-buttons").empty();

      for (var i = 0; i < animals.length; i++){
        // creates a button for each array
        var a = $("<button>");
        //adds the class animal
        a.addClass("animal");
        // adds the attribute animal name for each animal
        a.attr("animal-name", animals[i]);
        // provide the intial button text
        a.text(animals[i]);
        // append the animal buttons
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
