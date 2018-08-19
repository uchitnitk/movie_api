$(document).ready(() => {
    seachBar();
});
function  seachBar() {
  $('#searchForm').on('submit',(e) =>{
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
}
function getMovies (searchText) {
    axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&query='+searchText
    +'&language=en-US&api_key=8448903d151180f7e5b479d58032281a')
    .then((response) =>{
      console.log(response);
      let movies = response.data.results;
       let totalPages = response.data.total_pages;

      getTotalMovies(searchText,totalPages);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTotalMovies(searchText,totalPages) {
  $('#movies').html('');
  console.log(totalPages);
    for(var i=0;i<totalPages;i++){
      axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page='+(i+1)+'&query='+searchText
      +'&language=en-US&api_key=8448903d151180f7e5b479d58032281a')
      .then((response) =>{
        console.log(response);
        let movies = response.data.results;
        var output ='';
        $.each(movies,(index,movie)=>{
          if(movie.poster_path)
          {
            output+= `
              <div class="col-md-3 wrapper ">
                <div class="well text-center hovereffect">
                  <img src="${'https://image.tmdb.org/t/p/w500'+movie.poster_path}">
                  <div class="overlay">
                      <h2>${movie.original_title}</h2>
                  </div>
              </div>
              </div>
            `
          }
          });
        // console.log(output);
        $('#movies').append(output);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    seachBar();
}
