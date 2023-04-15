const search = document.querySelector(".search-button");
    search.addEventListener("click", () => {
      const inputValue = document.querySelector(".input-keyword");
      fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputValue.value)
        .then((res) => res.json())
        .then((res) => {
          const movies = res.Search;
          let cards = "";
          movies.forEach((el) => {
            cards += showCard(el);
          });
          const container = document.querySelector(".movie-container");
          container.innerHTML = cards;
          const movieDetail = document.querySelectorAll(".movie-detail");
          movieDetail.forEach((e) => {
            e.addEventListener("click", function () {
              const imdb = this.dataset.imdbid;
              fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdb)
                .then((res) => res.json())
                .then((res) => {
                  let detailMovie = document.querySelector(".movie-modal-box");
                  detailMovie.innerHTML = showMovieDetail(res);
                });
            });
          });
        });
      function showCard(el) {
        return ` <div class="col-md-4 my-5">
                            <div class="card">
                                <img src="${el.Poster}" class="card-img-top" />
                                    <div class="card-body">
                                        <h5 class="card-title">${el.Title}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
                                        <a href="#" class="btn btn-primary movie-detail" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${el.imdbID}">Details</a>
                                </div>
                            </div>
                        </div>`;
      }
      function showMovieDetail(res) {
        return `<div class="modal fade" id="movieDetail" tabindex="-1" aria-labelledby="movieDetailLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="movieDetailLabel">Modal title</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-3">
                                        <img src="${res.Poster}" class="img-fluid" />
                                        </div>
                                        <div class="col-md">
                                        <ul class="list-group">
                                            <li class="list-group-item"><h4>${res.Title} (${res.Year})</h4></li>
                                            <li class="list-group-item"><strong>Released : </strong>${res.Released}</li>
                                            <li class="list-group-item"><strong>Director : </strong>${res.Director}</li>
                                            <li class="list-group-item"><strong>Genre : </strong>${res.Genre}</li>
                                            <li class="list-group-item"><strong>Rate : </strong>${res.imdbRating}</li>
                                            <li class="list-group-item">
                                            <strong>Plot : </strong><br />
                                            ${res.Plot}
                                            </li>
                                        </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>`;
      }
    });