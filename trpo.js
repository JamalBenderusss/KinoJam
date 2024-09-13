const api_url = "https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2024&yearTo=2025&page=1";
const api_key = "7a8af25e-6b9e-4254-9671-71cbcfd8e3eb";
const api_url_new = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2025&month=JANUARY";

getMovies(api_url,"active",".films-list");
getMovies(api_url_new,"none",".new-films-list");

async function getMovies(url,active,div) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": api_key,
    },
  });
  const respData = await resp.json();
  console.log(respData)
  showMovies(respData,active,div);
  
};

const overlayFilm=document.getElementById('overlay-film-info');

function showMovies(data, active,div) {

  const moviesEl = document.querySelector(div);
  let modalN = 0; 
  
  if (active == "active"){
    for (let i = 0; i<data.items.length;i++) {

      const movie = data.items[i];
      const movieEl = document.createElement("div");

      movieEl.classList.add("films-list-item");
      movieEl.innerHTML=`
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="film-image">
      <h2 class="film-name">${movie.nameRu}</h2>
      <p class="film-cost ${active}" onClick = "openFilminfo(${modalN})" >15 руб</p>
      `;

      modalN++;

      $(".film-cost").on("click", function() {
        $(this).hide("slow");
    });

      moviesEl.appendChild(movieEl);   

    let film=document.createElement('div');
    film.classList.add('modal-film-info');
    let g='';

    for (let i = 0;i<movie.genres.length;i++){
      g+=movie.genres[i].genre+', ';
    }    

    let countries='';

    for (let i = 0;i<movie.countries.length;i++){
      countries+=movie.countries[i].country+', ';
    }  

      film.innerHTML=`
<div class="info">
  <h2 class="title"> ${movie.nameRu}</h2>
  <div class="film">
      <div class="info-film">  
          <p>
              <strong>Год показа</strong>
              ${movie.year}(мир) 
              <br>
          </p>
          <p>
              <strong>Жанр</strong>  
              ${g}
              <br>
          </p>
          <p>
              <strong>Рейтинг</strong> 
              ${movie.ratingKinopoisk} 
              <br>
          </p>
          <p>
              <strong>В главных ролях</strong> 
              ${countries}
              <br>
          </p>
          <div class="story">
              <p>
              “Откройте дверь в воображение” – Вас ждут фильмы, которые перенесут вас в другие миры и оставят незабываемые впечатления.
              </p>
          </div>
          <div id="tickets">
              <table class="ticketList">
                  <tr class="ticketList-item">
                      <td class="cinema">
                          <span class="cinemaName">Ёлки 10 12+ 2D
                          </span>
                          <span class="templateName">К-р Октябрь (Гродно)
                          </span>
                          <span class="templateName">Малый зал
                          </span>
                      </td>
                      <td class="times">
                          <a class="ticket" target="_blank" href="https://api.megamag.by/widget/seance.php?id=2561571">
                              <span>18:00
                              </span>
                              <br>
                              <span>8.00р.
                              </span>
                          </a>
                      </td>
                  </tr>
              </table>
          </div>
      </div>
  </div>
</div>
`;

overlayFilm.appendChild(film);

g = '';
countries = '';

    }
  }
  else {
    for (let i = 0; i<=3;i++) {

      const movie = data.items[i];
      const movieEl = document.createElement("div");

      movieEl.classList.add("films-list-item");
      
      movieEl.innerHTML=`
      <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="film-image" >
      <h2 class="film-name" >${movie.nameRu}</h2>
      `;
      
      moviesEl.appendChild(movieEl);   
    }
  }
  

}



(()=>{
  function handleFocus() {
    // Добавляем класс для подсветки текущей кнопки
    this.classList.add('activebtn');
  }
  

  // Функция, которая будет вызвана при потере фокуса
  function handleBlur() {
    // Убираем класс подсветки у текущей кнопки
    this.classList.remove('activebtn');
  }


  // Получаем все кнопки по классу
  var buttons = document.querySelectorAll('.days-list-item');

  // Назначаем функции handleFocus и handleBlur на события focus и blur каждой кнопки
  buttons.forEach(function (button) {
    button.addEventListener('focus', handleFocus);
    button.addEventListener('blur', handleBlur);
  });

  var registrationLink=document.getElementById('registration');

  var overlay=document.getElementById('overlay-registrastion')

  registrationLink.addEventListener('click',function(){
    overlay.style.display='block';
  })



  window.addEventListener('click',function(event){
    if(event.target===overlay){
      overlay.style.display='none';
    }
  })
  
})()
function openFilminfo(i){
  overlayFilms = document.querySelectorAll(".modal-film-info");
  overlayFilm.style.display = 'block';
  overlayFilms[i].style.display = 'block';
    
    
  window.addEventListener('click',function(event){
    if(event.target===overlayFilm){
      overlayFilm.style.display='none';
      overlayFilms[i].style.display = 'none';
      $(".active").show("slow");
    }
  })
}

