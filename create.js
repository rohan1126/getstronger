document
  .getElementById("workoutForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents form submission

    // Get the selected workout
    var selectedWorkout = document.querySelector(
      'input[name="workout"]:checked'
    ).value;

    // Clear the selection
    document.querySelector('input[name="workout"]:checked').checked = false;

    // Display the selected workout on the screen
    var workoutDisplay = document.getElementById("workoutDisplay");
    workoutDisplay.innerHTML = "Selected Workout: " + selectedWorkout;

    // Make API call
    const url =
      "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + selectedWorkout;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "21f43f6fe2msh2998ed916e77989p104673jsn0e135243fa7c",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Filter the results to include workouts with "barbell"
      const filteredResults = data.filter((result) =>
        result.name.toLowerCase().includes("barbell")
      );
      const cable = data.filter((result) =>
        result.name.toLowerCase().includes("cable")
      );

      // Get the first 3 filtered results
      const firstThreeResults = filteredResults.slice(0, 3);
      const three = cable.slice(0, 3);

      // Display the first 3 filtered results
      var resultDisplay = document.createElement("ul");
      firstThreeResults.forEach(function (result) {
        var listItem = document.createElement("li");
        listItem.textContent = result.name;
        resultDisplay.appendChild(listItem);
      });
      var cableDisplay = document.createElement("ul");
      three.forEach(function (result) {
        var listItem = document.createElement("li");
        listItem.textContent = result.name;
        resultDisplay.appendChild(listItem);
      });

      workoutDisplay.appendChild(resultDisplay);
    } catch (error) {
      console.error(error);
    }
  });
