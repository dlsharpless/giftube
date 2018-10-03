let displayGIFs = function () {
    $(".row3").empty();
    let inquiry = $("#searchTerm").val();
    let numberOfRecords = $("#numberOfRecords").val();
    let queryURL = `http://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=${numberOfRecords}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (i = 0; i < numberOfRecords; i++) {
            let newGIF = $(`<img src=${response.data[i].images.fixed_height.url}>`);
            $(".row3").append(newGIF);
        }
    })
}

let searchGiphy = function(event) {
    event.preventDefault();
    displayGIFs();
}

$("#searchButton").on("click", searchGiphy);