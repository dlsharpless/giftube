$("#searchButton").on('click', function(event){
    event.preventDefault();
    let rawInquiry = $("#searchTerm").val().trim();
    let compiledInquiry = `${rawInquiry} meme|memes`;
    console.log(`https://www.bing.com/images/search?q=${compiledInquiry}&FORM=OIIARP`);

    $.ajax({
        url: `https://www.bing.com/images/search?q=${compiledInquiry}&FORM=OIIARP`,
        method: 'GET',
    }).then(function(response){
    })
})

$.getJSON(`http://allorigins.me/get?url=https://www.bing.com/images/search?q=${compiledInquiry}&FORM=OIIARP&callback=?`, function(response){
    console.log(response);
});