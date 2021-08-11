'use strict';

function processingFormCommentsFilm(post) {
  const form = post.querySelector('.film-comments__block-form');

  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    
    const data = JSON.parse(formToJSON(form)),
          storage = JSON.parse(localStorage.getItem('films')),
          nameFilm = post.getAttribute('data-name');

    if (storage) {
      storage.forEach((item, i) => {
        if (item.title === nameFilm) {
          storage[i].comments.push(data.comment);
          updateComments(getFilm(nameFilm), storage[i].comments);
          localStorage.setItem('films', JSON.stringify(storage));
        }
      });
    }
    
    form.reset();
  });
}


function updateComments(form, comments) {
  form.querySelector('.film-comments__counter').innerText = comments.length;

  const blockComment = form.querySelector('.film-comments__block-history');
  let strCommentHTML = '<hr color="#e4edf4"/>';

  comments.forEach(item => {
    strCommentHTML +=  `<p class="film-comments__block-history-comment">${item}</p><hr color="#e4edf4"/>`;
  })
  
  blockComment.innerHTML = strCommentHTML;
}
