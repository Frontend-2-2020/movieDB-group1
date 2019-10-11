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
    Axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=03eb07b472e59db4fab1d72f159a2841`),

    //Call credits / cast
    Axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=03eb07b472e59db4fab1d72f159a2841`)
  ])
  .then(Axios.spread((movieResponse, videoResponse, creditsResponse) => {
    const movieDetailsData = movieResponse.data; //Return: specific movie details
    const movieVideos = videoResponse.data.results; //Returns a list with videos
    const creditsCastData = creditsResponse.data.cast; //Returns details about the cast

    fillHero(movieDetailsData, movieVideos);
    fillData(movieDetailsData);
    showProduction(movieDetailsData);
    setRating(movieDetailsData);
    fillCast(creditsCastData);
    fillMediaSection(movieDetailsData);

    console.log(movieDetailsData, movieVideos);
    console.log('credits', creditsCastData);
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

 const showProduction = (dataObj) =>{
   //Get production companies object
    const productionList = dataObj.production_companies;
    //Get ul-tag
    const productionListTag = document.querySelector('.production-comp');

    //Loop over production companies object
    productionList.forEach((el)=>{
      const productionItem = document.createElement('li');
      productionItem.classList.add('p-4');
      
      //Check if there is a path to a logo
      if(el.logo_path){
        const productionImgTag = document.createElement('img');
        //Add IMG-tag to LI
        productionItem.appendChild(productionImgTag);
        const productionLogo = `https://image.tmdb.org/t/p/w45${el.logo_path}`; //Last slash is in the path
        const productionName = el.name;
        productionImgTag.setAttribute('src', productionLogo);
        productionImgTag.setAttribute('alt', productionName);
      }else{
        //Add text to inform user that the logo is 'not found'
        var logoNAEl = document.createElement('p');
        logoNAEl.classList.add('not-found');
        logoNAEl.textContent = `Logo not found - ${el.name}`;
        productionItem.appendChild(logoNAEl);
      };
      //Add listitem to the UL
      productionListTag.appendChild(productionItem);
    });
 };

 const fillCast = (dataObj) => {
  const table = document.querySelector('.cast__list');

  dataObj.forEach((el) =>{
    console.log(el.name, el.profile_path);
    const tableRow = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const actorImg = document.createElement('img');

    cell1.textContent = el.name;
    cell2.textContent = el.character;
    //Check if there is an image available. If not, set text
    if(!el.profile_path){
      cell3.textContent = 'no img available';
      cell3.classList.add('not-found');
    }else{
      const actorImgUrl = `https://image.tmdb.org/t/p/w185${el.profile_path}`;
      actorImg.setAttribute('src', actorImgUrl);
      cell3.appendChild(actorImg);
      cell3.classList.add('actor__img');
    }
    
    tableRow.appendChild(cell1);
    tableRow.appendChild(cell2);
    tableRow.appendChild(cell3);
    table.appendChild(tableRow);
  });
 };


 const setRating = (dataObj) =>{
   const scoreVisual = document.querySelector('.score');
   const scoreTxt = document.querySelector('.score-txt');
   const vote = dataObj.vote_average * 10;
   scoreVisual.classList.add(`p${vote}`);
   scoreTxt.textContent = `${vote}%`;
 };

 const fillMediaSection = (dataObj) =>{
  const mediaItem = document.querySelector('.media__item');
  //Create necessary elements
  const mediaImg = document.createElement('img');
  const linkPoster = document.createElement('a');

  //Set attributes on elements
  linkPoster.setAttribute('href', `https://image.tmdb.org/t/p/w780${dataObj.poster_path}`);
  linkPoster.setAttribute('target', '_blank');
  const posterPath = `https://image.tmdb.org/t/p/w342${dataObj.poster_path}`;
  mediaImg.setAttribute('src', posterPath);

  //Append elements
  linkPoster.appendChild(mediaImg);
  mediaItem.appendChild(linkPoster);
 };

  // let classesToAdd = [ 'foo', 'bar', 'baz' ];
  // div.classList.add(...classesToAdd);