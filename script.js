const root = document.querySelector('#root');
const modal_detail = document.querySelector('#modal_detail');
const API_key = 'f38a84a3';

document.querySelector('#cari-submit').addEventListener('click', function () {

  // tangkap value form cari
  const cari = document.querySelector('#form-cari').value;
  const dataURL = `http://www.omdbapi.com/?s=${cari}&apikey=${API_key}`;

  fetch(dataURL)
    .then(response => response.json())
    .then(res => {
      const movie = res.Search;
      tampilData(movie);
    })
    .catch(err => {
      console.log(err);
    });

});

function tampilData(dataMovie) {
  root.innerHTML = `<div class="row my-5">${loopCard(dataMovie)}</div>`;
  tampilDetailMovie();
}

function loopCard(data) {
  let element = ``;
  data.forEach(d => {
    element += `
        <div class="card col-md-3 my-2">
          <img src="${d.Poster}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${d.Title}</h3>
            <h5 class="card-title">${d.Year}</h5>
            <button id="detail" data-id="${d.imdbID}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailFilem">
              detail
            </button>
          </div>
        </div>
    `;
  });

  return element;
}

function tampilDetailMovie() {
  const buttonDetail = document.querySelectorAll('button#detail');
  buttonDetail.forEach(button => {
    button.addEventListener('click', function () {
      fetchDetailMovie(this.getAttribute('data-id'));
    });
  });
}

function fetchDetailMovie(id_movie) {
  return fetch(`http://www.omdbapi.com/?i=${id_movie}&apikey=${API_key}`)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      tampilDataMovie(response);
    })
    .catch(err => console.log(err));
}

function tampilDataMovie(data) {
  const genre = data.Genre.split(',');
  const actors = data.Actors.split(',');

  let element = `
      <div class="row">
        <div class="col-md-5">
          <img src="${data.Poster}" alt="">
        </div>
        <div class="col-md-7">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><h4> ${data.Title} </h4></li>
            <li class="list-group-item">ratings ${data.imdbRating}</li>
            <li class="list-group-item">tahun <span>${data.Year}</span></li>
            <li class="list-group-item">genere :
              ${loopArrData(genre, 'info')}
            </li>
            <li class="list-group-item">actors :
              ${loopArrData(actors, 'success')}
            </li>
            <li class="list-group-item">sinopsis <p>${data.Plot}</p>
            </li>
          </ul>
        </div>
      </div>
  `;
  modal_detail.innerHTML = element;
}

function loopArrData(data, className) {
  let element = '';
  data.forEach(val => {
    element += `
    <h5 class="badge badge-pill badge-${className}">${val}</h5>
    `;
  });
  return element;
}