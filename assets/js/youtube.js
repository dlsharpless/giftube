let player1;
let videoArr = [];
function youtube(event) {
  event.preventDefault();
  // $('.videos').empty();
  // videoArr = [];
  const apiKey = 'AIzaSyAfBQxSnvQmRhhgFE5qfViIVfDvZ_t-u1Q';
  let input = $("#searchTerm").val().trim();
  let queryURL = `https://content.googleapis.com/youtube/v3/search?q=${input}&maxResults=25&part=snippet&key=${apiKey}`;
  
  // let removePlayer1 = document.getElementById('player1');
  // removePlayer1.removeChild()
  // $('#player1').empty();
  // $('#player2').empty();
  // $('#player3').empty();
  // $('#player4').empty();
  // $('#player5').empty();

  //Youtube API call to get video ids.
$.ajax({
  url: queryURL,
  method: 'GET',
  safeSearch: 'strict',
}).then(function (response) {
  //grabbing value selectedd from dropdown for the number of results to display.
  let value = $('#numberOfRecords').val();
 
  //creates array that holds video ids according to the value is selected by the user. 
  for (let i = 0; i <= `${value}`; i++) {
    // if(response.data[0].rating != "r") {
      console.log(response)
      let videoID = response.items[i].id.videoId
      videoArr.push(videoID)
  //passes video array into the player
  onYouTubePlayerAPIReady(videoArr);
// } else {
  
  // }
}
});

function onYouTubePlayerAPIReady(videoArr) {
  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  for(let i = 0; i < videoArr.length; i++){
      new YT.Player('player' + i, {
          height: '480',
          width: '270',
          videoId: videoArr[i],
          // events: {
          //   'onReady': onPlayerReady,
          //   'onStateChange': onPlayerStateChange
          // }
      })
    }
  }
}

//click listener for search button
$('#searchButton').on('click', youtube)