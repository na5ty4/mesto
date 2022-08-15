import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './data.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
/* добавила подключение css*/
import '../pages/index.css';

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
const formNewCard = document.querySelector('form[name="new-card"]');
const formEditProfile = document.querySelector('form[name="profile-info"]');
const popupImage = document.querySelector('.popup_type_image');

function handleCardClick(link, name) {
  const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.setEventListeners(buttonClosePopupImage);
  popupWithImage.open(link, name);
}

const initialCardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, handleCardClick, '.element-template');
    initialCardsList.addItem(card.generateCard());
  }},
  '.elements'
);

initialCardsList.renderItems();

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation()
const formNewCardValidator = new FormValidator(validationConfig, formNewCard);
formNewCardValidator.enableValidation();

const popupWithFormTypeNewCard = new PopupWithForm({
  popupSelector: popupNewCard,
  handleSubmitForm: (formData) => {
    const card = new Card(formData, handleCardClick, '.element-template');
    initialCardsList.addItem(card.generateCard());
  }
});

popupWithFormTypeNewCard.setEventListeners(buttonClosePopupNewCard);

buttonAddNewCard.addEventListener('click', function() {
  popupWithFormTypeNewCard.open();
});

const userInfo = new UserInfo({profileName: '.profile__name', profileDescription: '.profile__description'});

const popupWithFormTypeEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

popupWithFormTypeEditProfile.setEventListeners(buttonClosePopupEditProfile);

buttonEditProfile.addEventListener('click', function() {
  const {userName, userDescription} = userInfo.getUserInfo();
  inputName.value = userName;
  inputJob.value = userDescription;
  popupWithFormTypeEditProfile.open();
});