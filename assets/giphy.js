// -----------------------------------------------------------------------------------------------------------
// Function displayGIFs is to make ajax call to giphy api and get the response and display on the page
// -----------------------------------------------------------------------------------------------------------

let displayGIFs = function () {
// Empty div before fetching the results 
    $(".gifResults").empty();
// Get the user input
    let inquiry = $("#searchTerm").val();
    let numberOfRecords = $("#numberOfRecords").val();
// Build the API url
    let queryURL = `http://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=${numberOfRecords}`;
// Make ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
// Build the image tag to hold the gifs from the ajax response            
        for (let i = 0; i < response.data.length; i++) {
// Create image tag dynamically
            let newGIF = $(`<img src=${response.data[i].images.fixed_height.url}>`);
// Add tooltip on image 
             newGIF.attr("data-toggle","tooltip");
             newGIF.attr("data-placement","top");
             newGIF.attr("title","Right click to copy image address");
// Append img tag to div with class gifResults             
            $(".gifResults").append(newGIF);
        }

    })
}

// Function searchGiphy is triggered when user click on search button
let searchGiphy = function(event) {
    event.preventDefault();
// Call to function displayGIFs
    displayGIFs();
}

// Add on click event listener to search button and call function searchGiphy
$("#searchButton").on("click", searchGiphy);