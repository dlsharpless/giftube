// Make ajax call to Imgur api, get response, filter, and display on the page
function displayMemes() {
  // Empty div before fetching results
  $(".memeResults").empty();
  // Get user input
  let inquiry = $("#searchTerm").val().trim();
  let numberOfRecords = $("#numberOfRecords").val();
  // Make ajax call
  $.ajax({
    url: `https://api.imgur.com/3/gallery/search/top?q_any=meme%20memes&q_all=${inquiry}`,
    type: "GET",
    headers: { Authorization: "Client-ID 95cb0dd822c5eea" },
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
        // IIFE inside for loop allows for kicking out the iteration under certain conditions
        (function () {
          // Filter out nsfw material, animated GIFs, and videos
          if (
            response.data[i].nsfw ||
            response.data[i].looping ||
            response.data[i].mp4
          ) {
            // Skip the result and look for an additional one from the response if nsfw
            if (response.data.length > numberOfRecords) {
              numberOfRecords++;
            }
            // Kick out the iteration if the result is disqualified
            return;
          } else {
            // Build image elements to hold memes from the ajax response
            // Dynamically create image elements from the outer URL
            let newMeme = $(`<img height="200" src=${response.data[i].link}>`);
            // Look for an images folder
            if (Object.keys(response.data[i]).includes("images")) {
              // Filter out nsfw material, animated GIFs, and videos from the images folder
              if (
                response.data[i].images[0].nsfw ||
                response.data[i].images[0].looping ||
                response.data[i].images[0].mp4
              ) {
                // Skip the result and look for an additional one from the response if nsfw
                if (response.data.length > numberOfRecords) {
                  numberOfRecords++;
                }
                // Kick out the iteration if the result is disqualified
                return;
              } else {
                newMeme = $(
                  `<img height="200" src=${response.data[i].images[0].link}>`
                );
              }
            }
            // Add tooltip on image
            newMeme.attr("data-toggle", "tooltip");
            newMeme.attr("data-placement", "top");
            newMeme.attr("title", "Right click to copy image address");
            // Append img to results div
            $(".memeResults").append(newMeme);
            // Count the number of results being displayed
            numberOfResults++;
          }
        })();
      }
    }
    // Display number of results rendered
    $("#imgurTitle").text(`Imgur Memes [${numberOfResults} found]`);
  });
}

// Pull and display memes when search button is clicked
$("#searchButton").on("click", function (event) {
  event.preventDefault();
  displayMemes();
});
