export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    "content-type": "application/json",
    "authorization": '401c464d-109c-4fd2-a4b7-346e3caa6d96'
  }
};