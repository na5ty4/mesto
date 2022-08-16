import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, validationConfig} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupEditProfile = document.querySelector('.popup__close-button_edit-profile');
const buttonClosePopupNewCard = document.querySelector('.popup__close-button_new-card');
const buttonClosePopupImage = document.querySelector('.popup__close-button_image-popup');
const buttonAddNewCard = document.querySelector('.profile__add-button'); 
const inputName = document.querySelector('#profile-name');
const inputJob = document.querySelector('#profile-description');
const formNewCard = document.querySelector('form[name="new-card"]');
const formEditProfile = document.querySelector('form[name="profile-info"]');

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners(buttonClosePopupImage);

function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

function createCard(item) {
  const card = new Card(item, handleCardClick, '.element-template');
  return card.generateCard()
}

const initialCardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    initialCardsList.addItem(createCard(cardItem));
  }},
  '.elements'
);

initialCardsList.renderItems();

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation()
const formNewCardValidator = new FormValidator(validationConfig, formNewCard);
formNewCardValidator.enableValidation();

const popupWithFormTypeNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleSubmitForm: (formData) => {
    initialCardsList.addItem(createCard(formData));
  }
});

popupWithFormTypeNewCard.setEventListeners(buttonClosePopupNewCard);

buttonAddNewCard.addEventListener('click', function() {
  formNewCardValidator.disableSubmitButton();
  popupWithFormTypeNewCard.open();
});

const userInfo = new UserInfo({profileName: '.profile__name', profileDescription: '.profile__description'});

const popupWithFormTypeEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
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