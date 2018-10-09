function displayVideos() {
  $(".youtubeResults").empty();
  let inquiry = $("#searchTerm").val().trim();
  let numberOfRecords = $("#numberOfRecords").val();
  $.ajax({
    url: `https://content.googleapis.com/youtube/v3/search?q=${inquiry}&maxResults=25&part=snippet&key=AIzaSyAfBQxSnvQmRhhgFE5qfViIVfDvZ_t-u1Q`,
    method: "GET"
  }).then(function (response) {
    let numberOfResults = 0;
    if (response.items[0]) {
      for (let i = 0; i < numberOfRecords; i++) {
        if (response.items[i].id.videoId) {
          $(".youtubeResults").append(`<iframe height="200" src="https://www.youtube-nocookie.com/embed/${response.items[i].id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
          numberOfResults++;
        } else if (response.items.length > numberOfRecords) {
              numberOfRecords++;
        }
      }
    }
    $("#youtubeTitle").text(`YouTube Videos [${numberOfResults} found]`);
  });
}

$("#searchButton").on("click", function(event){
  event.preventDefault();
  displayVideos();
})