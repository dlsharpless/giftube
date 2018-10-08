let displayGIFs = function () {
    $(".gifResults").empty();
    let inquiry = $("#searchTerm").val();
    let numberOfRecords = $("#numberOfRecords").val();
    let queryURL = `http://api.giphy.com/v1/gifs/search?q=${inquiry}&api_key=njATj4tDM5p7IszkVAvnA35pkQe9v1GP&limit=${1000}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let numberOfResults = 0;
        if (response.data.length < numberOfRecords) {
            numberOfRecords = response.data.length;
        }
        if (response.data[0]) {
            for (i = 0; i < numberOfRecords; i++) {
                if (response.data[i].rating != "r") {
                    let newGIF = $(`<img src=${response.data[i].images.fixed_height.url}>`);
                    $(".gifResults").append(newGIF);
                    numberOfResults++;
                } else {
                    if (response.data.length > numberOfRecords) {
                        numberOfRecords++;
                    }
                }
            }
        }
        console.log(numberOfResults);
    })
}

$("#searchButton").on("click", function(event){
    event.preventDefault();
    displayGIFs();
})