// Get the elements
const dateInput = document.getElementById("date-input");
const workoutInput = document.getElementById("workout-input");
const setsInput = document.getElementById("sets-input");
const repsInput = document.getElementById("reps-input");
const weightInput = document.getElementById("weight-input");
const addWorkoutBtn = document.getElementById("add-workout-btn");
const workoutList = document.getElementById("workout-list");

// Load saved workouts from local storage
let savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

// Function to save the workouts to local storage
function saveWorkouts() {
  localStorage.setItem("workouts", JSON.stringify(savedWorkouts));
}

function createWorkoutItem() {
  const date = dateInput.value;
  const workout = workoutInput.value.trim();
  const sets = setsInput.value;
  const reps = repsInput.value;
  const weight = weightInput.value;

  if (workout === "" || date === "") {
    return; // If no workout or date is entered, exit the function
  }

  const workoutItem = {
    date,
    workout,
    sets,
    reps,
    weight,
  };

  // Check if there is an existing workout list item for the selected date
  let listItem = workoutList.querySelector(`li[data-date="${date}"]`);

  if (!listItem) {
    // If no existing workout list item, create a new one
    listItem = document.createElement("li");
    listItem.setAttribute("data-date", date);
    listItem.innerHTML = `
      <h4>${date}</h4>
      <ul class="workout-items"></ul>
    `;
    workoutList.appendChild(listItem);
  }

  const workoutItems = listItem.querySelector(".workout-items");

  // Check if there is an existing workout item for the selected date and workout
  let workoutListItem = workoutItems.querySelector(
    `li[data-workout="${workout}"]`
  );

  if (!workoutListItem) {
    // If no existing workout item, create a new one
    workoutListItem = document.createElement("li");
    workoutListItem.setAttribute("data-workout", workout);
    workoutListItem.innerHTML = `
      <div class="workout-info">
        <span>${workout}</span>
        <span>Sets: ${sets}</span>
        <span>Reps: ${reps}</span>
        <span>Weight: ${weight}</span>
      </div>
      <button class="remove-btn">X</button>
    `;
    workoutItems.appendChild(workoutListItem);
  } else {
    // If an existing workout item is found, update its information
    const workoutInfo = workoutListItem.querySelector(".workout-info");
    workoutInfo.innerHTML = `
      <span>${workout}</span>
      <span>Sets: ${sets}</span>
      <span>Reps: ${reps}</span>
      <span>Weight: ${weight}</span>
    `;
  }

  savedWorkouts.push(workoutItem);
  saveWorkouts();

  // Clear the input fields
  dateInput.value = "";
  workoutInput.value = "";
  setsInput.value = "";
  repsInput.value = "";
  weightInput.value = "";
}

// Function to remove a workout item
function removeWorkoutItem(event) {
  if (event.target.classList.contains("remove-btn")) {
    const listItem = event.target.closest("li[data-date]");
    const workoutItem = event.target.parentElement;
    const workoutItems = listItem.querySelector(".workout-items");
    workoutItems.removeChild(workoutItem);

    if (workoutItems.childElementCount === 0) {
      workoutList.removeChild(listItem);
    }

    const date = listItem.getAttribute("data-date");
    const index = savedWorkouts.findIndex(
      (item) =>
        item.date === date &&
        item.workout === workoutItem.querySelector("span").textContent
    );
    savedWorkouts.splice(index, 1);
    saveWorkouts();
  }
}

// Function to display the saved workouts on page load
function displaySavedWorkouts() {
  // Sort the saved workouts array by date in ascending order
  savedWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const workoutItem of savedWorkouts) {
    let listItem = workoutList.querySelector(
      `li[data-date="${workoutItem.date}"]`
    );
    if (!listItem) {
      listItem = document.createElement("li");
      listItem.setAttribute("data-date", workoutItem.date);
      listItem.innerHTML = `
        <h4>${workoutItem.date}</h4>
        <ul class="workout-items"></ul>
      `;
      workoutList.appendChild(listItem);
    }

    const workoutItems = listItem.querySelector(".workout-items");
    const workoutListItem = document.createElement("li");
    workoutListItem.innerHTML = `
      <div class="workout-info">
        <span>${workoutItem.workout}</span>
        <span>Sets: ${workoutItem.sets}</span>
        <span>Reps: ${workoutItem.reps}</span>
        <span>Weight: ${workoutItem.weight}</span>
      </div>
      <button class="remove-btn">X</button>
    `;
    workoutItems.appendChild(workoutListItem);
  }
}

// Event listeners
addWorkoutBtn.addEventListener("click", createWorkoutItem);
workoutList.addEventListener("click", removeWorkoutItem);

// Display saved workouts on page load
displaySavedWorkouts();
