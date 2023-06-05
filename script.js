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
    question: "How often do you exercise?",
    options: ["1-2 days per week", "3-4 days per week", "5+ days per week"],
  },
  {
    question: "What is your primary fitness goal?",
    options: [
      "Weight loss",
      "Muscle building",
      "Improving cardiovascular fitness",
      "Overall health and well-being",
    ],
  },
  {
    question: "How much time can you dedicate to workouts per day?",
    options: [
      "Less than 30 minutes",
      "30-45 minutes",
      "45-60 minutes",
      "More than 60 minutes",
    ],
  },
  {
    question: "What kind of equipment do you have?",
    options: ["Large Gym", "Small Gym", "Body Weight Only"],
  },
];

// Display the current question and options
function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = option;
    li.textContent = option;
    li.appendChild(radio);
    optionsElement.appendChild(li);
  });
}

// Store the user's choice for each question
function saveUserChoice() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    userChoices.push(selectedOption.value);
  }
}

// Generate the workout plan based on user's choices
function generateWorkoutPlan() {
  const [frequency, goal, time, equipment] = userChoices;
  let workoutSplit = "";

  if (frequency === "1-2 days per week") {
    workoutSplit = "Upper/Lower";
  } else if (frequency === "3-4 days per week") {
    workoutSplit = "Arnold Split";
  } else if (frequency === "5+ days per week") {
    workoutSplit = "Push/Pull/Legs";
  }

  const workoutPlan = `Workout Split: ${workoutSplit}`;

  workoutPlanElement.textContent = workoutPlan;
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

// Generate the weekly calendar

// Call the generateWeeklyCalendar function after the survey is completed and the workout plan is generated
submitButton.addEventListener("click", function () {
  nextQuestion();

  if (currentQuestionIndex === quizData.length) {
    quizContainer.style.display = "none";
    generateWorkoutPlan();
    generateWeeklyCalendar(); // Call the function to generate the weekly calendar
    scoreElement.style.display = "none";
  }
});

// Start the survey
displayQuestion();
