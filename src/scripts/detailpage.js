import Axios from 'axios';
import queryString from 'query-string';
// Get object with movie ID
const parsed = queryString.parse(location.search);
let movieID = parsed.movie;

export function initDetail(){
  // GET movieDetails
  Axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=03eb07b472e59db4fab1d72f159a2841`)
  .then(function (response) {
    // handle success
    // Declare data variable - one object about a specific movie - catched with ID from URL (queryString)
    const movieDetailsData = response.data;

    // GET movie videos, based on ID
    Axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=03eb07b472e59db4fab1d72f159a2841`)
    .then(function(response){
      const movieVideosData = response.data.results;
      console.log('details', movieDetailsData);
      console.log('video', movieVideosData);

      fillHero(movieDetailsData, movieVideosData);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }); // END second GET - call
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
};

function fillHero(data, movies){
  const heroImg = document.querySelector('.jumbotron--bg');
  const urlImg = `url('https://image.tmdb.org/t/p/w1280/${data.backdrop_path}')`;
  const tagLine = document.querySelector('#tagline');
  const movieTitle = document.querySelector('#movie-title');
  const movieSummary = document.querySelector('#intro');
  // const movieTrailer = document.querySelector('#trailer');
  // const urlTrailer = `https://www.youtube.com/embed/${data.}LFoz8ZJWmPs`;

  heroImg.style.backgroundImage = urlImg;
  tagLine.textContent = data.tagline;
  movieTitle.textContent = data.title;
  movieSummary.textContent = data.overview;
  // console.log(movieTrailer);
  // movieTrailer.setAttribute('src', '');

}