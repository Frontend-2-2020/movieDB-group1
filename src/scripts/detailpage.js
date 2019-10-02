import Axios from 'axios';
import queryString from 'query-string';
// Get object with movie ID
const parsed = queryString.parse(location.search);
let movieID = parsed.movie;


export function initDetail(){
  Axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=03eb07b472e59db4fab1d72f159a2841`)
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
};