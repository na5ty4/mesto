import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopUp, closePopUp, popupImage} from './PopupUtils.js';


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorActiveClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closeButtonEditProfile = document.querySelector('.popup__close-button_edit-profile');
const closeButtonNewCard = document.querySelector('.popup__close-button_new-card');
const closeButtonImagePopup = document.querySelector('.popup__close-button_image-popup');
const addButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');
const placeName = document.querySelector('#card-name');
const placeLink = document.querySelector('#card-link');
const newCardForm = document.querySelector('form[name="new-card"]');
const editProfileForm = document.querySelector('form[name="profile-info"]');
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function renderCard(card) {
  elements.prepend(card);
};

addButton.addEventListener('click', function() {
  openPopUp(popupNewCard);
});

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopUp(popupEditProfile);
});

closeButtonEditProfile.addEventListener('click', function() {
  closePopUp(popupEditProfile);
});

closeButtonNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard);
});

closeButtonImagePopup.addEventListener('click', function() {
  closePopUp(popupImage);
});

function handleSubmitProfileForm() {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopUp(popupEditProfile);
};

editProfileForm.addEventListener('submit', (evt) => {
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
  const card = new Card(item, '.element-template');
  renderCard(card.generateCard());
}); 

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector('.popup__save-button');
  submitButton.classList.add('popup__save-button_inactive');
  submitButton.setAttribute('disabled', true);

  const card = new Card({
    name: placeName.value,
    link: placeLink.value
  }, '.element-template');
  renderCard(card.generateCard());

  closePopUp(popupNewCard);
  newCardForm.reset();
});

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  });
};

enableValidation(validationConfig);