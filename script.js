// script.js

function calculateBMR(Username, age, weight, height, goals) {
  //66.47 + ( 6.24 × weight in pounds ) + ( 12.7 × height in inches ) − ( 6.755 × age in years )
  const name = document.getElementById("name");
  const calcCal = document.getElementById("cal");
  const bulk = document.getElementById("bulk");
  const bmi = document.getElementById("bmi");
  const protein = document.getElementById("protein");
  let Bmr = Math.round(66.47 + 6.24 * weight + 12.7 * height - 6.755 * age);
  let Bmi = Math.round((703 * weight) / (height * height));
  let proteinMin = weight - 25;
  // let proteinMax = weight + 10;
  let bulkCal = Bmr + 500;
  let cutCal = Bmr - 500;
  let maintainCal = Bmr - 250;

  name.textContent =
    "Hello " +
    Username +
    " We are so glad you are looking to better yourself! Below is some information that would be useful to reach your goals";
  bmi.textContent = "Your BMI is: " + Bmi;
  protein.textContent =
    "You should be aiming to eat " +
    proteinMin +
    " - " +
    weight +
    " grams of protein a day";
  calcCal.textContent =
    "Your BMR is: " +
    Bmr +
    " BMR is the amount of calories you burn by doing nothing";
  if (goals.includes("bulk") || goals.includes("Bulk")) {
    bulk.textContent =
      "To Bulk you should be eating roughly: " + bulkCal + " Calories";
  } else if (goals.includes("maintain")) {
    bulk.textContent =
      "To maintain you should be eating roughly : " + Bmr + " Calories";
  } else {
    bulk.textContent =
      "To Cut you should be eating roughly: " + cutCal + " Calories";
  }
}

const form = document.getElementById("user-info-form");
const resultDiv = document.getElementById("result");
const name = document.getElementById("names");
const ageInput = document.getElementById("age");
const weightInput = document.getElementById("weight");
const weightGoal = document.getElementById("weightGoal");
const heightInput = document.getElementById("height");
const goalsInput = document.getElementById("goals");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const names = name.value.toUpperCase();
  const age = ageInput.value;
  const weight = weightInput.value;
  const height = heightInput.value;
  const goals = goalsInput.value.toLowerCase();
  const goalWeight = weightGoal.value;

  // Save input values to local storage
  localStorage.setItem("name", names);
  localStorage.setItem("age", age);
  localStorage.setItem("weight", weight);
  localStorage.setItem("height", height);
  localStorage.setItem("goals", goals);
  localStorage.setItem("goalWeight", goalWeight);

  if (goals.includes("bulk") && weight < goalWeight) {
    const result = "Based on your input you want to bulk";
    resultDiv.textContent = result;

    calculateBMR(names, age, weight, height, goals);
  } else if (goals.includes("cut") && weight > goalWeight) {
    const result = "Based on your input you want to cut";
    resultDiv.textContent = result;
    calculateBMR(names, age, weight, height, goals);
  } else if (goals.includes("maintain") && weight === goalWeight) {
    const result = "Based on your input you want to maintain your weight";
    resultDiv.textContent = result;
    calculateBMR(names, age, weight, height, goals);
  } else {
    const result =
      "Please check to see if your goals have been entered properly";
    resultDiv.textContent = result;
  }
});

// Retrieve input values from local storage when the page loads
window.addEventListener("load", function () {
  const savedName = localStorage.getItem("name");
  const savedAge = localStorage.getItem("age");
  const savedWeight = localStorage.getItem("weight");
  const savedHeight = localStorage.getItem("height");
  const savedGoals = localStorage.getItem("goals");
  const savedGoalWeight = localStorage.getItem("goalWeight");

  if (savedName) {
    name.value = savedName;
  }
  if (savedAge) {
    ageInput.value = savedAge;
  }
  if (savedWeight) {
    weightInput.value = savedWeight;
  }
  if (savedHeight) {
    heightInput.value = savedHeight;
  }
  if (savedGoals) {
    goalsInput.value = savedGoals;
  }
  if (savedGoalWeight) {
    weightGoal.value = savedGoalWeight;
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const ageInput = document.getElementById("age");
  const weightInput = document.getElementById("weight");
  const weightGoal = document.getElementById("weightGoal");
  const heightInput = document.getElementById("height");
  const goalsInput = document.getElementById("goals");
  const name = document.getElementById("names");
  const names = name.value.toUpperCase();
  const age = ageInput.value;
  const weight = weightInput.value;
  const height = heightInput.value;
  const goals = goalsInput.value.toLowerCase();
  const goalWeight = weightGoal.value;

  if (goals.includes("bulk") && weight < goalWeight) {
    const result = "Based on your input you want to bulk";
    resultDiv.textContent = result;

    calculateBMR(names, age, weight, height, goals);
  } else if (goals.includes("cut") && weight > goalWeight) {
    const result = "Based on your input you want to cut";
    resultDiv.textContent = result;
    calculateBMR(names, age, weight, height, goals);
  } else if (goals.includes("maintain") && weight === goalWeight) {
    const result = "Based on your input you want to maintain your weight";
    resultDiv.textContent = result;
    calculateBMR(names, age, weight, height, goals);
  } else {
    const result =
      "Please check to see if your goals have been entered properly";
    resultDiv.textContent = result;
  }
});

const showContainerButton = document.getElementById("submit");
const container = document.getElementById("container");

showContainerButton.addEventListener("click", () => {
  container.style.display = "flex";
});
