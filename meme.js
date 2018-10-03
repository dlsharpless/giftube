// const searchItem = $('#searchTerm').val().trim();
// console.log(searchItem);
// const queryURL = `https://www.googleapis.com/customsearch/v1?key=AIzaSyCZ2LRU0uen4Klsuc_scqXGdTkyeCaMfnY&cx=017576662512468239146:omuauf_lfve&q=${searchItem}`;

// $("#searchButton").on('click', function(event){
//     event.preventDefault();
//     //let q = $("#searchTerm").val().trim();
//     $.ajax({
//       url:queryURL,
//       method: 'GET'
//     }).then(function(response){
//       const img1 = $("<img>");
//       console.log(response.url.template);
//       img1.attr('src',response.url.template);
//         $(".parameters").append(img1);
//     })
//   })
let url = '';
$("#searchButton").on('click', function(event){
    event.preventDefault();
    let q = $("#searchTerm").val().trim();
    console.log(q);
  
    $.ajax({
      //url:`https://www.googleapis.com/search?key=AIzaSyCZ2LRU0uen4Klsuc_scqXGdTkyeCaMfnY&cx=017576662512468239146:omuauf_lfve&q=${q}`,
      //url:`https://www.googleapis.com/customsearch/v1?q=${q}&cr=009182105009178099374:rm6ck7icj_g`,
      url: `https://www.bing.com/images/search?q=${q}&FORM=OIIARP`,
      method: 'GET'
    }).then(function(response){
        //console.log(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCZ2LRU0uen4Klsuc_scqXGdTkyeCaMfnY&cx=017576662512468239146:omuauf_lfve&q=images`);
        console.log(response);
    //   const img1 = $("<img>");
    //         console.log(response[0].contentUrl);
    //         img1.attr('src',response[0].contentUrl);
    //           $(".parameters").append(img1);

    })
  })