const quizContainer = document.querySelector(".quiz-container");
const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const submitButton = document.querySelector("#submit-btn");
const workoutPlanElement = document.querySelector("#workout-plan");

let currentQuestionIndex = 0;
let userChoices = [];

// Define the quiz data (questions and options)
const quizData = [
  {
    question: "What muscle groups do you want to target",
    options: ["chest", "shoulders", "back", "biceps", "legs"],
  },
  // {
  //   question: "What kind of equipment do you have?",
  //   options: ["Large Gym", "Small Gym", "Body Weight Only"],
  // },
];

// Display the current question and options
function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "answer";
    checkbox.value = option.toLowerCase(); // Assign the lowercase muscle group as the value

    // Create an image element and set the image source
    const image = document.createElement("img");
    image.src = "images/" + option.toLowerCase() + ".jpg"; // Replace with the folder path and image extension
    image.classList.add("option-image"); // Add a class to the image for styling

    li.appendChild(checkbox);
    li.appendChild(image);
    optionsElement.appendChild(li);
  });
}

// Store the user's choices for each question
function saveUserChoice() {
  const selectedOptions = Array.from(
    document.querySelectorAll('input[name="answer"]:checked')
  );
  userChoices = selectedOptions.map((option) => option.value);
}

// Generate the workout plan based on user's choices
function generateWorkoutPlan() {
  const selectedOptions = Array.from(
    document.querySelectorAll('input[name="answer"]:checked')
  );

  const muscleGroups = selectedOptions
    .filter(
      (option) =>
        option.value !== "Large Gym" &&
        option.value !== "Small Gym" &&
        option.value !== "Body Weight Only"
    )
    .map((option) => option.value);

  const workoutSplits = {
    chest: {
      shoulders: "Chest and Shoulders Split",
      back: "Chest and Back Split",
      biceps: "Chest and Biceps Split",
      legs: "Chest and Legs Split",
      "upper body": "Chest and Upper Body Split",
      "lower body": "Chest and Lower Body Split",
    },
    shoulders: {
      back: "Shoulders and Back Split",
      biceps: "Shoulders and Biceps Split",
      legs: "Shoulders and Legs Split",
      "upper body": "Shoulders and Upper Body Split",
      "lower body": "Shoulders and Lower Body Split",
    },
    back: {
      biceps: "Back and Biceps Split",
      legs: "Back and Legs Split",
      "upper body": "Back and Upper Body Split",
      "lower body": "Back and Lower Body Split",
    },
    biceps: {
      legs: "Biceps and Legs Split",
      "upper body": "Biceps and Upper Body Split",
      "lower body": "Biceps and Lower Body Split",
    },
    legs: {
      "upper body": "Legs and Upper Body Split",
      "lower body": "Legs and Lower Body Split",
    },
    "upper body": {
      "lower body": "Upper Body and Lower Body Split",
    },
  };

  let workoutSplit = "No specific workout selected";

  const selectedMuscleGroups = Object.keys(workoutSplits).filter((group) =>
    muscleGroups.includes(group)
  );
  if (selectedMuscleGroups.length >= 1) {
    let options = workoutSplits[selectedMuscleGroups[0]];
    for (let i = 1; i < selectedMuscleGroups.length; i++) {
      const group = selectedMuscleGroups[i];
      options = {
        ...options,
        ...workoutSplits[group],
      };
    }
    const selectedOption = Object.keys(options).find((option) =>
      muscleGroups.includes(option)
    );
    if (selectedOption !== undefined) {
      workoutSplit = options[selectedOption];
    }
  }

  const workoutPlan = `Workout Split: ${workoutSplit}`;

  workoutPlanElement.textContent = workoutPlan;

  console.log("Selected muscle groups:", muscleGroups);
}

// Move to the next question or end the survey
function nextQuestion() {
  saveUserChoice();

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    displayQuestion();
  } else {
    quizContainer.style.display = "none";
    generateWorkoutPlan();
  }
}

// Call the nextQuestion function when the submit button is clicked
submitButton.addEventListener("click", nextQuestion);

// Start the survey
displayQuestion();
