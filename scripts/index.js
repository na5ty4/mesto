import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopUp, closePopUp, popupImage} from './popupUtils.js';
import {initialCards} from './data.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
};
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonClosePopupEditProfile = document.querySelector('.popup__close-button_edit-profile');
const buttonClosePopupNewCard = document.querySelector('.popup__close-button_new-card');
const buttonClosePopupImage = document.querySelector('.popup__close-button_image-popup');
const buttonAddNewCard = document.querySelector('.profile__add-button'); 
const inputName = document.querySelector('#profile-name');
const inputJob = document.querySelector('#profile-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');
const placeName = document.querySelector('#card-name');
const placeLink = document.querySelector('#card-link');
const formNewCard = document.querySelector('form[name="new-card"]');
const formEditProfile = document.querySelector('form[name="profile-info"]');

function renderCard(card) {
  elements.prepend(card);
};

function createCard(cardData) {
  const card = new Card(cardData, '.element-template');
  renderCard(card.generateCard());
}

buttonAddNewCard.addEventListener('click', function() {
  openPopUp(popupNewCard);
});

buttonEditProfile.addEventListener('click', function() {
    inputName.value = profileName.textContent;
    inputJob.value = profileDescription.textContent;
    openPopUp(popupEditProfile);
});

buttonClosePopupEditProfile.addEventListener('click', function() {
  closePopUp(popupEditProfile);
});

buttonClosePopupNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

buttonClosePopupImage.addEventListener('click', function() {
  closePopUp(popupImage);
});

function handleSubmitProfileForm() {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputJob.value;
    closePopUp(popupEditProfile);
};

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleSubmitProfileForm();
}); 

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopUp(popupElement);
    }
  });
});

initialCards.forEach((item) => {
  createCard(item);
}); 

formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = formNewCard.querySelector('.popup__save-button');
  formNewCardValidator.disableSubmitButton(buttonClosePopupNewCard);
  createCard({
    name: placeName.value,
    link: placeLink.value
  });
  closePopUp(popupNewCard);
  formNewCard.reset();
});

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation()
const formNewCardValidator = new FormValidator(validationConfig, formNewCard);
formNewCardValidator.enableValidation();