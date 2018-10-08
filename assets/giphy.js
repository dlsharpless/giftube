// Make ajax call to Giphy api, get response, filter, and display on the page
let displayGIFs = function () {
    // Empty div before fetching results
    $(".gifResults").empty();
    // Get user input
    let inquiry = $("#searchTerm").val();
    let numberOfRecords = $("#numberOfRecords").val();
    // Build API url
    let queryURL = `http://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=${1000}`;
    // Make ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let numberOfResults = 0;
        if (response.data.length < numberOfRecords) {
            numberOfRecords = response.data.length;
        }
        // Check that results have been returned
        if (response.data[0]) {
            // Build the image tag to hold GIFs from the ajax response
            for (i = 0; i < numberOfRecords; i++) {
                // Filter out R-rated material
                if (response.data[i].rating != "r") {
                    // Dynamically create image elements
                    let newGIF = $(`<img src=${response.data[i].images.fixed_height.url}>`);
                    // Add tooltip on image
                    newGIF.attr("data-toggle","tooltip");
                    newGIF.attr("data-placement","top");
                    newGIF.attr("title","Right click to copy image URL");
                    // Append img tag to div with class gifResults
                    $(".gifResults").append(newGIF);
                    numberOfResults++;
                } else {
                    if (response.data.length > numberOfRecords) {
                        numberOfRecords++;
                    }
                }
            }
        }
        $("#giphyTitle").text(`Giphy GIFs (${numberOfResults})`);
    })
}

// Pull and display GIFs when search button is clicked
$("#searchButton").on("click", function(event){
    event.preventDefault();
    displayGIFs();
})