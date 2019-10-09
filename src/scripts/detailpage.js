import Axios from 'axios';
import queryString from 'query-string';
// Get object with movie ID
const parsed = queryString.parse(location.search);
let movieID = parsed.movie;
let ranking = parsed.rank;

export function initDetail(){
  Axios.all([
    //Call movie detail
    Axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=03eb07b472e59db4fab1d72f159a2841`),

    //Call videos
    Axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=03eb07b472e59db4fab1d72f159a2841`)
  ])
  .then(Axios.spread((movieResponse, videoResponse) => {
    const movieDetailsData = movieResponse.data; //Return: specific movie details
    const movieVideos = videoResponse.data.results; //Returns a list with videos

    fillHero(movieDetailsData, movieVideos);
    fillData(movieDetailsData);
    setRating(movieDetailsData);
    showProduction(movieDetailsData);

    console.log(movieDetailsData, movieVideos);
  }));
};

//Fill complete 'hero'
const fillHero =(data, trailer)=>{
  showRanking(ranking);
  addHeroImg(data);
  addIntroTxt(data);
  addTrailer(trailer);
};

//Add rankingnumber to hero
const showRanking = (rank) =>{
  const rankElem = document.querySelector('.ranking__num');
  rankElem.textContent = rank;
};

//Adds hero image
const addHeroImg = (dataObj) =>{
  const heroImg = document.querySelector('.jumbotron--bg');
  const urlImg = `url('https://image.tmdb.org/t/p/w1280/${dataObj.backdrop_path}')`;
  heroImg.style.backgroundImage = urlImg;
};

//Adds hero text
const addIntroTxt = (dataObj) =>{
  const tagLine = document.querySelector('#tagline');
  const movieTitle = document.querySelector('#movie-title');
  const movieSummary = document.querySelector('#intro');

  tagLine.textContent = dataObj.tagline;
  movieTitle.textContent = dataObj.title;
  movieSummary.textContent = dataObj.overview;
};

const addTrailer = (videoObj) =>{
  const iframeTrailer = document.getElementById('trailer');
  if(videoObj){
    const urlTrailer = `https://www.youtube.com/embed/${videoObj[0].key}`;
    iframeTrailer.setAttribute('src', urlTrailer);
  }else{
    iframeTrailer.setAttribute('style', 'display: none');
  }
};

const fillData = (dataObj) =>{
    const releaseDate = document.getElementById('release');
    const date = dataObj.release_date;

    const runtimeEl = document.getElementById('runtime');
    const runtime = dataObj.runtime;

    releaseDate.textContent = date;
    runtimeEl.textContent = `${runtime} min.`;
 };

 //CONTINUE HERE ...!!!!!
 const showProduction = (dataObj) =>{
    const productionList = dataObj.production_companies;
    const productionListTag = document.querySelector('.production-comp');

    productionList.forEach((el)=>{
      const productionItem = document.createElement('li');
      productionItem.classList.add('p-4');
      
      if(el.logo_path){
        var productionImgTag = document.createElement('img');
        //Add IMG-tag to LI
        productionItem.appendChild(productionImgTag);
        const productionLogo = `https://image.tmdb.org/t/p/w45${el.logo_path}`; //Last slash is in the path
        const productionName = el.name;
        productionImgTag.setAttribute('src', productionLogo);
        productionImgTag.setAttribute('alt', productionName);
      }else{
        var logoNAEl = document.createElement('p');
        logoNAEl.textContent = 'logo not found';
        productionItem.appendChild(logoNAEl);
      };
      //Add listitem to the UL
      productionListTag.appendChild(productionItem);
    });
    
 };

 const setRating = (dataObj) =>{
   const scoreVisual = document.querySelector('.score');
   const scoreTxt = document.querySelector('.score-txt');
   const vote = dataObj.vote_average * 10;
   scoreVisual.classList.add(`p${vote}`);
   scoreTxt.textContent = `${vote}%`;
 };


// BACKUP (vragen les)
// // GET movieDetails
  // Axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=03eb07b472e59db4fab1d72f159a2841`)
  // .then(function (response) {
  //   // handle success
  //   // Declare data variable - one object about a specific movie - catched with ID from URL (queryString)
  //   const movieDetailsData = response.data;

  //   // GET movie videos, based on ID
  //   Axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=03eb07b472e59db4fab1d72f159a2841`)
  //   .then(function(response){
  //     const movieVideos = response.data.results;
  //     fillHero(movieDetailsData, movieVideos);
  //     console.log(movieVideos);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   }); // END second GET - call
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });