var dps = []; //dataPoints.

var chart = new CanvasJS.Chart("chartContainer", {
  title: {
    text: "Accepting DataPoints from User Input",
  },
  data: [
    {
      type: "line",
      dataPoints: dps,
    },
  ],
});

function addDataPointsAndRender() {
  xValue = Number(document.getElementById("xValue").value);
  yValue = Number(document.getElementById("yValue").value);
  dps.push({
    x: xValue,
    y: yValue,
  });
  chart.render();
}

renderButton.addEventListener("click", addDataPointsAndRender);

renderButton.addEventListener("click", addDPsAndRender);
