'use strict';

window.onload = () => {
  renderFilmsOfLocalStorage();
  UpdatePositionContent();
  createForm();
};


window.addEventListener("resize", () => {
  UpdatePositionContent();
});


function toggleShowFormAddFilm() {
  const form = document.querySelector('.form-add-film'),
        headerBtn = document.querySelector('.header__item-btn'),
        circle = headerBtn.querySelector('.header__item-btn-circle'),
        headerText = headerBtn.querySelector('.header__item-btn-text');

  if (headerBtn.getAttribute('data-state') === 'close') {
    headerBtn.setAttribute('data-state', 'open');
    circle.innerHTML = '&times;';
    headerText.textContent = 'Close form';
    form.style.display = 'block';
    
    if (form.querySelector('.form-add-film__row-btn.btn-blue').innerText === 'Edit') {
      form.reset();
      form.querySelector('.form-add-film__row-btn.btn-blue').innerText = 'Add';
    }
    
  } else {
    headerBtn.setAttribute('data-state', 'close');
    circle.innerHTML = '&plus;';
    headerText.textContent = 'Add new film';
    form.style.display = 'none';
  }

  UpdatePositionContent();
}


function toggleShowComments(nameFilm) {
  const film = getFilm(nameFilm),
        btnComments = film.querySelector('.film-comments__btn-show'),
        btnCommentsState = film.querySelector('.film-comments__state'),
        blockComments = film.querySelector('.film-comments__block');

  if (btnComments.getAttribute('data-state') === 'close') {
    btnComments.setAttribute('data-state', 'open');
    btnCommentsState.innerHTML = '&or;';
    blockComments.style.display = 'block';
  } else {
    btnComments.setAttribute('data-state', 'close');
    btnCommentsState.innerHTML = '&and;';
    blockComments.style.display = 'none';
  }
}