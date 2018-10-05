let player1;
let videoArr = [];
function youtube(event) {
  event.preventDefault();
  const apiKey = 'AIzaSyAfBQxSnvQmRhhgFE5qfViIVfDvZ_t-u1Q';
  let input = $("#searchTerm").val().trim();
  let queryURL = `https://content.googleapis.com/youtube/v3/search?q=${input}&maxResults=25&part=snippet&key=${apiKey}`;

  //Initialize the youtube JavaScript client library.
$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function (response) {
  let value = $('#numberOfRecords').val();

  for (let i = 0; i <= `${value}`; i++) {
      let videoID = response.items[i].id.videoId
      videoArr.push(videoID)
  }

  onYouTubePlayerAPIReady(videoArr);
console.log(videoArr)
});

function onYouTubePlayerAPIReady(videoArr) {
  // Load the IFrame Player API code asynchronously.

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  for(let i = 0; i < videoArr.length; i++){
      new YT.Player('player' + i, {
          height: '200',
          width: '300',
          videoId: videoArr[i]
      });
  }
}
}

$('#searchButton').on('click', youtube)