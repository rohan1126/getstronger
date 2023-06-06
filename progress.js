var storedWeightDates = JSON.parse(localStorage.getItem("weightDates")) || [];
var storedWeightWeights =
  JSON.parse(localStorage.getItem("weightWeights")) || [];
var storedSquatDates = JSON.parse(localStorage.getItem("squatDates")) || [];
var storedSquatWeights = JSON.parse(localStorage.getItem("squatWeights")) || [];
var storedDeadDates = JSON.parse(localStorage.getItem("deadDates")) || [];
var storedDeadWeights = JSON.parse(localStorage.getItem("deadWeights")) || [];

// Initialize global variables
var weightDates = storedWeightDates;
var weightWeights = storedWeightWeights;
var squatDates = storedSquatDates;
var squatWeights = storedSquatWeights;
var deadDates = storedDeadDates;
var deadWeights = storedDeadWeights;
var chart;
// Function to add data
function addData(chartId) {
  var dateInput = document.getElementById("date");
  var weightInput = document.getElementById("weight");
  var squatDateInput = document.getElementById("squat-date");
  var squatWeightInput = document.getElementById("squat-weight");
  var deadDateInput = document.getElementById("dead-date");
  var deadWeightInput = document.getElementById("dead-weight");

  var date = dateInput.value;
  var weight = weightInput.value;
  var squatDate = squatDateInput.value;
  var squatWeight = squatWeightInput.value;
  var deadDate = deadDateInput.value;
  var deadWeight = deadWeightInput.value;

  localStorage.setItem("weightDates", JSON.stringify(weightDates));
  localStorage.setItem("weightWeights", JSON.stringify(weightWeights));
  localStorage.setItem("squatDates", JSON.stringify(squatDates));
  localStorage.setItem("squatWeights", JSON.stringify(squatWeights));
  localStorage.setItem("deadDates", JSON.stringify(deadDates));
  localStorage.setItem("deadWeights", JSON.stringify(deadWeights));

  if (chartId === "weight") {
    // Add weight data to arrays
    weightDates.push(date);
    weightWeights.push(weight);

    // Update max weight for bench press
    var maxWeight = Math.max(...weightWeights);
    document.getElementById("maxBench").textContent = maxWeight;

    // Save weight data to localStorage
    localStorage.setItem("weightDates", JSON.stringify(weightDates));
    localStorage.setItem("weightWeights", JSON.stringify(weightWeights));

    // Clear weight input fields
    dateInput.value = "";
    weightInput.value = "";
  } else if (chartId === "squat") {
    // Add squat data to arrays
    squatDates.push(squatDate);
    squatWeights.push(squatWeight);

    // Update max weight for squat
    var maxWeight = Math.max(...squatWeights);
    document.getElementById("maxSquat").textContent = maxWeight;

    // Save squat data to localStorage
    localStorage.setItem("squatDates", JSON.stringify(squatDates));
    localStorage.setItem("squatWeights", JSON.stringify(squatWeights));

    // Clear squat input fields
    squatDateInput.value = "";
    squatWeightInput.value = "";
  } else if (chartId === "dead") {
    // Add deadlift data to arrays
    deadDates.push(deadDate);
    deadWeights.push(deadWeight);

    // Update max weight for deadlift
    var maxWeight = Math.max(...deadWeights);
    document.getElementById("maxDeadlift").textContent = maxWeight;

    // Save deadlift data to localStorage
    localStorage.setItem("deadDates", JSON.stringify(deadDates));
    localStorage.setItem("deadWeights", JSON.stringify(deadWeights));

    // Clear deadlift input fields
    deadDateInput.value = "";
    deadWeightInput.value = "";
  }

  // Update the chart
  updateChart();
}

// Function to update the chart
function updateChart() {
  var ctx = document.getElementById("chart").getContext("2d");

  // Destroy the previous chart instance
  if (chart) {
    chart.destroy();
  }

  // Create the chart
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: weightDates.concat(squatDates),
      datasets: [
        {
          label: "Weight Progress",
          data: weightWeights,
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          borderColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Squat Progress",
          data: squatWeights,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Deadlift Progress",
          data: deadWeights,
          backgroundColor: "rgb(0,255,0,.5)",
          borderColor: "rgb(0,255,0)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function clearChart() {
  // Clear data arrays
  weightDates = [];
  weightWeights = [];
  squatDates = [];
  squatWeights = [];
  deadDates = [];
  deadWeights = [];

  // Clear data in localStorage
  localStorage.removeItem("weightDates");
  localStorage.removeItem("weightWeights");
  localStorage.removeItem("squatDates");
  localStorage.removeItem("squatWeights");
  localStorage.removeItem("deadDates");
  localStorage.removeItem("deadWeights");

  // Update the chart
  updateChart();
  document.getElementById("maxBench").textContent = "N/A";
  document.getElementById("maxSquat").textContent = "N/A";
  document.getElementById("maxDeadlift").textContent = "N/A";
}

function undoData() {
  // Check which chart is currently active
  var activeChartId = chart.config.data.datasets[0].label;

  if (activeChartId === "Weight Progress") {
    // Remove the last weight data point
    weightDates.pop();
    weightWeights.pop();

    // Update max weight for bench press
    var maxWeight = Math.max(...weightWeights);
    document.getElementById("maxBench").textContent = maxWeight;

    // Update localStorage
    localStorage.setItem("weightDates", JSON.stringify(weightDates));
    localStorage.setItem("weightWeights", JSON.stringify(weightWeights));
  } else if (activeChartId === "Squat Progress") {
    // Remove the last squat data point
    squatDates.pop();
    squatWeights.pop();

    // Update max weight for squat
    var maxWeight = Math.max(...squatWeights);
    document.getElementById("maxSquat").textContent = maxWeight;

    // Update localStorage
    localStorage.setItem("squatDates", JSON.stringify(squatDates));
    localStorage.setItem("squatWeights", JSON.stringify(squatWeights));
  } else if (activeChartId === "Deadlift Progress") {
    // Remove the last deadlift data point
    deadDates.pop();
    deadWeights.pop();

    // Update max weight for deadlift
    var maxWeight = Math.max(...deadWeights);
    document.getElementById("maxDeadlift").textContent = maxWeight;

    // Update localStorage
    localStorage.setItem("deadDates", JSON.stringify(deadDates));
    localStorage.setItem("deadWeights", JSON.stringify(deadWeights));
  }

  // Update the chart
  updateChart();
}
function initializePage() {
  // Retrieve max weights from localStorage
  var maxBench = Math.max(...weightWeights);
  var maxSquat = Math.max(...squatWeights);
  var maxDeadlift = Math.max(...deadWeights);

  // Display max weights
  document.getElementById("maxBench").textContent = maxBench || "N/A";
  document.getElementById("maxSquat").textContent = maxSquat || "N/A";
  document.getElementById("maxDeadlift").textContent = maxDeadlift || "N/A";

  // Update the chart
  updateChart();
}

// Initial chart setup
updateChart();
initializePage();
