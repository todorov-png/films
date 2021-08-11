'use strict';

function addFilmItem(data) {
    const wrapper = document.querySelector('.content');
  
    if (wrapper) {
      const post = document.createElement('div');
  
      post.classList.add('film');
      post.setAttribute('data-name', data.title);
      post.innerHTML = `
      <div class="film-content" style="background: url('${data.poster}'); background-size: 300%; background-position: center;">
          <div class="film-content__img">
              <img src="${data.poster}" alt="">
          </div>
          <div class="film-content__text">
              <p class="film-content__text-name">${data.title}</p>
              <p class="film-content__text-description">${data.description}</p>
              <table class="film-content__text-table">
                  <tr>
                      <td class="film-content__text-table-heading">Country</td>
                      <td class="film-content__text-table-country">${data.country}</td>
                  </tr>
                  <tr>
                      <td class="film-content__text-table-heading">Year</td>
                      <td class="film-content__text-table-year">${data.year}</td>
                  </tr>
                  <tr>
                      <td class="film-content__text-table-heading">Genre</td>
                      <td class="film-content__text-table-genre">${data.genre}</td>
                  </tr>
              </table>
              <div class="film-content__text-btn">
                  <button class="btn btn-red btn-delete" type="button" name="delete">Delete</button>
                  <button class="btn btn-blue btn-edit" type="button" name="edit">Edit</button>
              </div>
          </div>
      </div>
      <div class="film-comments">
          <a href="javascript:void(0);" class="film-comments__btn-show" data-state="close"">
              Comments: <span class="film-comments__counter">0</span> <span class="film-comments__state">&and;</span>
          </a>
          <div class="film-comments__block">
              <div class="film-comments__block-history">
                  <hr color="#e4edf4"/>
              </div>
              <form class="film-comments__block-form">
                  <input id="comment" type="text" name="comment" placeholder="Add your comment" required>
                  <button class="btn btn-blue btn-add" type="submit" name="add" data-name="${data.title}">Add</button>
              </form>
          </div>
      </div>
      `;
      
      wrapper.append(post);
      processingFormCommentsFilm(post);
      updateComments(post, data.comments);

      post.querySelector('.btn-delete').addEventListener('click', () => {
        deletePostFilm(post, data.title);
      });

      post.querySelector('.btn-edit').addEventListener('click', () => {
        editPostFilm(data);
      });

      post.querySelector('.film-comments__btn-show').addEventListener('click', () => {
        toggleShowComments(post.getAttribute('data-name'));
      });
    }
  }
  

  function renderFilmsOfLocalStorage() {
  
    if (localStorage.getItem('films')) {
      const dataFilms = JSON.parse(localStorage.getItem('films'));
  
      dataFilms.forEach(film => {
        addFilmItem(film);
      });
    }
  }


  function getFilm(nameFilm) {
    const films = document.querySelectorAll('.film');
    let film;
  
    films.forEach(item => {
      if(item.getAttribute('data-name') === nameFilm) {
        film = item;
      }
    });
  
    return film;
  }


  function deletePostFilm(post, nameFilm) {
    post.remove();
    removeLocalStorageFilm(nameFilm);
  }


  function removeLocalStorageFilm(nameFilm) {
    if (localStorage.getItem('films')) {
      const dataStorage = JSON.parse(localStorage.getItem('films'));

      dataStorage.forEach((item, i) => {
        if (item.title === nameFilm) {
          dataStorage.splice(i, 1);
          localStorage.setItem('films', JSON.stringify(dataStorage));
        }
      });
    }
  }


function editPostFilm(data) {
  const form = document.querySelector('.form-add-film'),
        headerBtn = document.querySelector('.header__item-btn'),
        circle = headerBtn.querySelector('.header__item-btn-circle'),
        headerText = headerBtn.querySelector('.header__item-btn-text');

  form.querySelector('.form-add-film__row-btn.btn-blue').innerText = 'Edit';
  form.querySelector('#film-title').value = data.title;
  form.querySelector('#film-year').value = data.year;
  form.querySelector('#film-country').value = data.country;
  form.querySelector('#film-genre').value = data.genre;
  form.querySelector('#film-poster').value = data.poster;
  form.querySelector('#film-description').value = data.description;

  localStorage.setItem('edit_post', data.title);

  headerBtn.setAttribute('data-state', 'open');
  circle.innerHTML = '&times;';
  headerText.textContent = 'Close form';
  form.style.display = 'block';

  smoothJumpUp();
}


function updatePost(data, nameFilm) {
  const filmPosts = document.querySelectorAll('.film');

  filmPosts.forEach(item => {
    if (item.getAttribute('data-name') === nameFilm) {
      item.setAttribute('data-name', data.title);
      item.querySelector('.film-content__text-name').innerText = data.title;
      item.querySelector('.film-content__text-table-year').innerText = data.year;
      item.querySelector('.film-content__text-table-country').innerText = data.country;
      item.querySelector('.film-content__text-table-genre').innerText = data.genre;
      item.querySelector('.film-content').style.cssText = `background: url('${data.poster}'); background-size: 300%; background-position: center;`;
      item.querySelector('.film-content__img img').src = data.poster;
      item.querySelector('.film-content__text-description').innerText = data.description;
    }
  });
}