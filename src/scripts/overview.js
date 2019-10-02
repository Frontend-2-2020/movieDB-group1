import Axios from 'axios';

export function initOverview() {

    Axios
        .get(
            'https://api.themoviedb.org/3/movie/popular?api_key=d8dfe38fbb3fbe5e4586e9dd35f' +
            '7f889'
        )
        .then(function (response) {
            var resultaat = response.data.results;
            console.log(response);
            for (var i = 0; i < 10; i++) {

                console.log(resultaat[i]); //standaard key in axios is data
                var film =   `
                <div class="card h-100" id="film${i}">
                                <a href=""><img
                                    id="poster${i}"
                                    class="card-img-top w3-hover-opacity"
                                    src="https://image.tmdb.org/t/p/w500/${resultaat[i].poster_path}"></a>
                                <h1 id="titel${i}" class="card-title">${resultaat[i].title}</h1>
                                <h2 id="score${i}" class="card-score">${resultaat[i].vote_average}</h2>
                                <p id="reldate${i}" class="card-text">Release date: ${resultaat[i].release_date} </p>
                            </div>
                
                            `
                document
                    .querySelector('#overview')
                    .innerHTML+= film
  
            };
            film.addEventListener('click',function(){document.location.href= `${document.location.href}?movie=${resultaat[i].id} `})
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        . finally(function () {
            // always executed
        });

}

