let displayGIFs = function () {
    $(".gifResults").empty();
    let inquiry = $("#searchTerm").val();
    let numberOfRecords = $("#numberOfRecords").val();
    //console.log(numberOfRecords);
    let queryURL = `http://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=${numberOfRecords}`;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
                
        for (let i = 0; i < response.data.length; i++) {
             let newGIF = $(`<img src=${response.data[i].images.fixed_height.url}>`);
             //newGIF.addClass('newGIF');
             $(".gifResults").append(newGIF);
        }

    })
}

let searchGiphy = function(event) {
    event.preventDefault();
    displayGIFs();
}

$("#searchButton").on("click", searchGiphy);