let player;


function youtube(event) {
  event.preventDefault();
  const apiKey = 'AIzaSyAfBQxSnvQmRhhgFE5qfViIVfDvZ_t-u1Q';
  let input = $("#searchTerm").val().trim();
  let queryURL = `https://content.googleapis.com/youtube/v3/search?q=${input}&maxResults=25&part=snippet&key=${apiKey}`;

  // 2. Initialize the youtube JavaScript client library.
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    
    
    let videoID = response.items[0].id.videoId
    // console.log(videoID)
    player.loadVideoById(videoID)
  });
}

// Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.

function onYouTubePlayerAPIReady(videoID) {
  player = new YT.Player('player', {
    height: '300',
    width: '480',
    videoId: videoID ? videoID : 'RIuKQPg5npE',
  
  });

}

$('#searchButton').on('click', youtube)