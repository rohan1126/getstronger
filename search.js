document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var searchInput = document.getElementById("searchInput").value;
    if (searchInput.trim() !== "") {
      var googleSearchUrl =
        "https://www.google.com/search?q=" + encodeURIComponent(searchInput);
      window.open(googleSearchUrl, "_blank");
    }
  });
