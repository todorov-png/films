'use strict';

function createForm() {
  const wrapper = document.querySelector('.content');

  if (wrapper) {
    const form = document.createElement('form');
  
    form.classList.add('form-add-film');
    form.innerHTML = `
    <div class="form-add-film__row">
        <label for="film-title">title</label>
        <input id="film-title" type="text" name="title" placeholder="Enter the title of the movie" required tabindex="1">
    </div>
    <div class="form-add-film__row">
        <label for="film-year">year</label>
        <input id="film-year" type="number" name="year" placeholder="Enter the year the movie was released" min="1900" max="2100" maxlength="4" pattern="[0-9]{4}" required tabindex="2">
    </div>
    <div class="form-add-film__row">
        <label for="film-country">country</label>
        <input id="film-country" type="text" name="country" placeholder="Enter the country of the movie" required tabindex="3">
    </div>
    <div class="form-add-film__row">
        <label for="film-genre">genre</label>
        <input id="film-genre" type="text" name="genre" placeholder="Enter the genre of the movie" required tabindex="4">
    </div>
    <div class="form-add-film__row">
        <label for="film-poster">poster (link)</label>
        <input id="film-poster" type="text" name="poster" placeholder="Enter the link to the movie poster" required tabindex="5">
    </div>
    <div class="form-add-film__row">
        <label for="description">description</label>
        <textarea name="description" id="film-description" placeholder="Enter a description of the movie" required maxlength="3000" tabindex="6"></textarea>
    </div>
    <div class="form-add-film__row">
        <button class="form-add-film__row-btn btn btn-red btn-cancel" type="button" name="cancel" tabindex="6">Cancel</button>
        <button class="form-add-film__row-btn btn btn-blue" type="submit" name="add" tabindex="7">Add</button>
    </div>
    `;

    wrapper.prepend(form);

    form.querySelector('.btn-cancel').addEventListener('click', () => {
      toggleShowFormAddFilm();
    });
    
    processingFormAddFilm(form);
  }
}


function UpdatePositionContent() {
  const header = document.querySelector('.header'),
        content = document.querySelector('.content');

  if (header) {
    if (header.clientWidth >= 950) {
      content.style.margin = `0 ${header.querySelector('.header__item-logo').clientWidth}px`;
    } else {
      content.style.margin = "0";
    }
  }
}


function processingFormAddFilm(form) {
  form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const dataForm = JSON.parse(formToJSON(form)),
          storage = JSON.parse(localStorage.getItem('films'));

    if (form.querySelector('.form-add-film__row-btn.btn-blue').innerText === 'Add') {
      if (storage && storage.some((elem) => elem.title === dataForm.title)){
        callPopUp('Such a film is already in the database');
      } else {
        dataForm.comments = [];
        form.reset();
  
        callPopUp('Successful');
        addFilmItem(dataForm);
        addLocalStorage(dataForm, 'films');
        toggleShowFormAddFilm();
      }
    } else {

      if (storage && localStorage.getItem('edit_post')) {
        const nameFilm = localStorage.getItem('edit_post');

        storage.forEach((item, i) => {
          if (item.title === nameFilm) {
            dataForm.comments = storage[i].comments;
            storage[i] = dataForm;
            localStorage.setItem('films', JSON.stringify(storage));
            localStorage.removeItem('edit_post');
            updatePost(dataForm, nameFilm);
            toggleShowFormAddFilm();
          }
        })
        callPopUp('Successful');
      }
    }
  });
}