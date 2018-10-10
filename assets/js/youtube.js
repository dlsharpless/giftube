let player1;
let videoArr = [];
let videoID = '';


//youtube api call function starts here
function youtube(event) {
  event.preventDefault();
  //empty results for every new search
  $('.youtubeResults').empty();

  //grabbing value selected from dropdown for the number of results to display.
  let input = $("#searchTerm").val().trim();
  let value = $("#numberOfRecords").val();
  const apiKey = 'AIzaSyAfBQxSnvQmRhhgFE5qfViIVfDvZ_t-u1Q';
  let queryURL = `https://content.googleapis.com/youtube/v3/search?q=${input}&maxResults=25&part=snippet&key=${apiKey}`;

  //creates empty video array for video ids to be stored
  videoArr = [];

  //Youtube API call to get video ids.
  $.ajax({
    url: queryURL,
    method: 'GET',

  }).then(function (response) {
    // console.log(response.items)

    let numOfResults = 0;
    
    if (response.items[0]) {
      console.log('if')
      //creates array that holds video ids according to the value is selected by the user. 
      for (let i = 0; i < `${value}`; i++) {
        if(videoID){
        //creating variable for video id
        videoID = response.items[i].id.videoId
        //pushing video ids into the array
        videoArr.push(videoID)
        
        //dynamically creating the iframe player
        $('.youtubeResults').append(`<iframe height="200" src="https://www.youtube-nocookie.com/embed/${videoID}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
      
      } else if (response.items.length > value) {
        value++;
        console.log('else if')
      }
    }
  }
    //creating varibale for number of results

    if (videoArr.length < value) {
      // console.log('if')
      numOfResults = videoArr.length;
      $('#youtubeTitle').text(`YouTube Videos [${numOfResults} Found]`)
    } else if (numOfResults = value) {
      // console.log('else if')
      $('#youtubeTitle').text(`YouTube Videos [${value} Found]`)
    } else {
      $('#youtubeTitle').text('YouTube Videos [0 Found]')
    }
    console.log(videoArr)
  });
}
$('#searchButton').on('click', youtube)