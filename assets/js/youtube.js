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

    //if function checks for a true response
    if (response.items[0]) {

      //creates array that holds video ids according to the value is selected by the user. 
      for (let i = 0; i < `${value}`; i++) {

        //creating variable for video id
        videoID = response.items[i].id.videoId;
        if (videoID) {

          //pushing video ids into the array
          videoArr.push(videoID);

          //dynamically creating the iframe player
          $('.youtubeResults').append(`<iframe height="200" src="https://www.youtube-nocookie.com/embed/${videoID}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);

        } else if (response.items.length > value) {
          value++;
        }
      }
    }

    //If the length of the video array is less than the results requested...
    if (videoArr.length < value) {
      //then the number of results becomes the length of the array
      numOfResults = videoArr.length;
      //display the number of results
      $('#youtubeTitle').text(`YouTube Videos [${numOfResults} Found]`)
      //else if the number of results is the same as the requested results...
    } else if (numOfResults = value) {
      //display the number of results requested
      $('#youtubeTitle').text(`YouTube Videos [${value} Found]`)
    } else {
      //lastly, if there are no results returned then display 0 videos found
      $('#youtubeTitle').text('YouTube Videos [0 Found]')
    }

  });
}

//event listener for search button click
$('#searchButton').on('click', youtube)