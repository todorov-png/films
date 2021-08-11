'use strict';

function formToJSON(form) {
  const formData = new FormData(form),
        json = JSON.stringify(Object.fromEntries(formData.entries()));

  return json;
}


function addLocalStorage(data, NameKey) {
  let newData = [];
    
  if (localStorage.getItem(NameKey)) {
    newData = JSON.parse(localStorage.getItem(NameKey));
  }

  newData.push(data);
  localStorage.setItem(NameKey, JSON.stringify(newData));
}


function smoothJumpUp() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0,-40);
      setTimeout(smoothJumpUp, 10);
  }
}