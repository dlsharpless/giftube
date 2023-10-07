// Make ajax call to Giphy api, get response, filter, and display on the page
function displayGIFs() {
  // Empty div before fetching results
  $(".gifResults").empty();
  // Get user input
  let inquiry = $("#searchTerm").val().trim();
  let numberOfRecords = $("#numberOfRecords").val();
  // Make ajax call
  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=1000`,
    method: "GET",
  }).then(function (response) {
    // Start result count at zero
    let numberOfResults = 0;
    // Check that results have been returned
    if (response.data[0]) {
      // Limit records to no more than the data allows for
      if (response.data.length < numberOfRecords) {
        numberOfRecords = response.data.length;
      }
      for (i = 0; i < numberOfRecords; i++) {
        // Filter out R-rated material
        if (response.data[i].rating != "r") {
          // Dynamically create image elements
          let newGIF = $(
            `<img src=${response.data[i].images.fixed_height.url}>`
          );
          // Add tooltip on image
          newGIF.attr("data-toggle", "tooltip");
          newGIF.attr("data-placement", "top");
          newGIF.attr("title", "Right click to copy image address");
          // Append img to results div
          $(".gifResults").append(newGIF);
          // Count the number of results being displayed
          numberOfResults++;
          // Skip the result and look for an additional one from the response if R-rated
        } else if (response.data.length > numberOfRecords) {
          numberOfRecords++;
        }
      }
    }
    // Display number of results rendered
    $("#giphyTitle").text(`Giphy GIFs [${numberOfResults} found]`);
  });
}

// Pull and display GIFs when search button is clicked
$("#searchButton").on("click", function (event) {
  event.preventDefault();
  displayGIFs();
});
