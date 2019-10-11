import Axios from 'axios';
import queryString from 'query-string';
export function initOverview() {
    Axios
        .get(
            'https://api.themoviedb.org/3/movie/popular?api_key=d8dfe38fbb3fbe5e4586e9dd35f' +
            '7f889'
        )
        .then(function (response) {
            var resultaat = response.data.results;
            console.log(response);
            for (var i = 0; i < 20; i++) {
                console.log(resultaat[i]); //standaard key in axios is data
                var film =   `
                <div class="card h-100 " id="film${i}" data-id="${resultaat[i].id}" data-rank="${[i+1]}">
                                <a href=""><img
                                    id="poster${i}"
                                    class="card-img-top w3-hover-opacity"
                                    src="https://image.tmdb.org/t/p/w500/${resultaat[i].poster_path}"></a>
                                <div class="d-title"><h1 id="titel${i}" class="card-title">${resultaat[i].title}</h1></div>
                                <div class="d-ranking"><p class="ranking">${[i+1]}</p></div>
                                <h2 id="score${i}" class="card-score"> <strong>Score:</strong> ${resultaat[i].vote_average}</h2>
                                <p id="reldate${i}" class="card-text"><strong>Release date:</strong> ${resultaat[i].release_date} </p>
                            </div>
                
                            `;
                document
                    .querySelector('#overview')
                    .innerHTML+= film;
            };

            // Get recently created filmcards
            var films = document.querySelectorAll('.card');

            // Add eventslistener to each card
            for(var j = 0; j < films.length; j++){
              console.log(films[j]);
              films[j].addEventListener("click", function(e){
                e.preventDefault();
                console.log(this.getAttribute("data-id"));

                //Adds 'movieID' and 'ranking number' in URL to catch in detailpage
                window.location.href += `?movie=${this.getAttribute("data-id")}&rank=${this.getAttribute("data-rank")}`;
              });
            };

            //TO BE DELETED
            // film.addEventListener('click', function(){
            //   document.location.href= `${document.location.href}?movie=${resultaat[i].id}`;
            // });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        . finally(function () {
            // always executed
        });
}


