// Get the elements
const workoutInput = document.getElementById("workout-input");
const setsInput = document.getElementById("sets-input");
const repsInput = document.getElementById("reps-input");
const weightInput = document.getElementById("weight-input");
const addWorkoutBtn = document.getElementById("add-workout-btn");
const workoutList = document.getElementById("workout-list");

// Load saved workouts from local storage
const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

// Function to save the workouts to local storage
function saveWorkouts() {
  localStorage.setItem("workouts", JSON.stringify(savedWorkouts));
}

// Function to create a new workout item
// Function to create a new workout item
function createWorkoutItem() {
  const workout = workoutInput.value.trim();
  const sets = setsInput.value;
  const reps = repsInput.value;
  const weight = weightInput.value;

  if (workout === "") {
    return; // If no workout is entered, exit the function
  }

  const workoutItem = {
    workout,
    sets,
    reps,
    weight,
  };

  savedWorkouts.push(workoutItem);
  saveWorkouts();

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="workout-info">
      <span>${workout}</span>
      <span>Sets: ${sets}</span>
      <span>Reps: ${reps}</span>
      <span>Weight: ${weight}</span>
    </div>
    <button class="remove-btn">X</button>
  `;
  workoutList.appendChild(listItem);

  // Clear the input fields
  workoutInput.value = "";
  setsInput.value = "";
  repsInput.value = "";
  weightInput.value = "";
}

// Function to remove a workout item
function removeWorkoutItem(event) {
  if (event.target.classList.contains("remove-btn")) {
    const listItem = event.target.parentElement;
    const index = Array.from(workoutList.children).indexOf(listItem);
    savedWorkouts.splice(index, 1);
    saveWorkouts();
    workoutList.removeChild(listItem);
  }
}

// Function to display the saved workouts on page load
function displaySavedWorkouts() {
  for (const workoutItem of savedWorkouts) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${workoutItem.workout}</span>
      <span>Sets: ${workoutItem.sets}</span>
      <span>Reps: ${workoutItem.reps}</span>
      <span>Weight: ${workoutItem.weight}</span>
      <button class="remove-btn">X</button>
    `;
    workoutList.appendChild(listItem);
  }
}

// Event listeners
addWorkoutBtn.addEventListener("click", createWorkoutItem);
workoutList.addEventListener("click", removeWorkoutItem);

// Display saved workouts on page load
displaySavedWorkouts();
