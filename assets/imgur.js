let displayMemes = function () {
    $(".memeResults").empty();
    let rawInquiry = $("#searchTerm").val().trim();
    let compiledInquiry = `${rawInquiry} meme`;
    let numberOfRecords = $("#numberOfRecords").val();
    $.ajax({
        url: `https://api.imgur.com/3/gallery/search/top?q=${compiledInquiry}`,
        type: "GET",
        headers: {Authorization: 'Client-ID 95cb0dd822c5eea'}
    }).then(function(response) {
        let numberOfResults = 0;
        if (response.data[0]) {
            if (response.data.length < numberOfRecords) {
                numberOfRecords = response.data.length;
            }
            for (i = 0; i < numberOfRecords; i++) {
                (function() {
                    if (response.data[i].nsfw || response.data[i].looping) {
                        if (response.data.length > numberOfRecords) {
                            numberOfRecords++;
                        }
                        return;
                    } else {
                        let newMeme = $(`<img style="height: 200px" src=${response.data[i].link}>`);
                        if (Object.keys(response.data[i]).includes("images")) {
                            if (response.data[i].images[0].nsfw || response.data[i].images[0].looping) {
                                if (response.data.length > numberOfRecords) {
                                    numberOfRecords++;
                                }
                                return;
                            } else {
                            newMeme = $(`<img style="height: 200px" src=${response.data[i].images[0].link}>`);
                            }
                        }
                        $(".memeResults").append(newMeme);
                        numberOfResults++;
                    }
                })();
            }
        }
        $("#imgurTitle").text(`Imgur Memes (${numberOfResults})`);
    });
}

$("#searchButton").on('click', function(event){
     event.preventDefault();
    displayMemes();
})