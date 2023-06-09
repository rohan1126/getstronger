document
  .getElementById("workoutForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents form submission

    // Get the selected workouts
    var selectedWorkouts = Array.from(
      document.querySelectorAll('input[name="workout"]:checked')
    ).map((input) => input.value);

    // Get the selected equipment
    var selectedEquipment = document.querySelector(
      'input[name="equipment"]:checked'
    ).value;

    // Clear the selections
    Array.from(
      document.querySelectorAll('input[name="workout"]:checked')
    ).forEach((input) => (input.checked = false));
    document.querySelector('input[name="equipment"]:checked').checked = false;

    // Display the selected workouts and equipment on the screen
    var workoutDisplay = document.getElementById("workoutDisplay");
    workoutDisplay.innerHTML =
      "Selected Workouts: " +
      selectedWorkouts.join(", ") +
      "<br/>Selected Equipment: " +
      selectedEquipment;

    // Make API calls and filter results based on workouts and equipment
    try {
      for (const selectedWorkout of selectedWorkouts) {
        const url =
          "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" +
          selectedWorkout;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "21f43f6fe2msh2998ed916e77989p104673jsn0e135243fa7c",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        // Filter the results to include workouts with the selected equipment
        const filteredResults = data.filter((result) =>
          result.equipment.toLowerCase().includes(selectedEquipment)
        );

        // Get the first 3 filtered results
        const firstThreeResults = filteredResults.slice(0, 3);

        // Display the first 3 filtered results
        var resultDisplay = document.createElement("ul");
        firstThreeResults.forEach(function (result) {
          var listItem = document.createElement("li");
          var link = document.createElement("a");
          link.href = result.gifUrl; // Set the URL you want to link to
          link.target = "_blank"; // Optional: Open the link in a new tab/window

          var workoutName = document.createElement("span");
          workoutName.textContent = result.name;

          var gifImg = document.createElement("img");
          gifImg.src = result.gifUrl;
          gifImg.alt = result.name;

          link.appendChild(workoutName);
          listItem.appendChild(link);
          listItem.appendChild(gifImg);
          resultDisplay.appendChild(listItem);
        });

        workoutDisplay.appendChild(resultDisplay);
      }
    } catch (error) {
      console.error(error);
    }
  });
