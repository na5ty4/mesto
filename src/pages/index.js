import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, apiConfig} from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';


const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupEditProfile = document.querySelector('.popup__close-button_edit-profile');
const buttonClosePopupNewCard = document.querySelector('.popup__close-button_new-card');
const buttonClosePopupImage = document.querySelector('.popup__close-button_image-popup');
const buttonAddNewCard = document.querySelector('.profile__add-button'); 
const inputName = document.querySelector('#profile-name');
const inputJob = document.querySelector('#profile-description');
const formNewCard = document.querySelector('form[name="new-card"]');
const formEditProfile = document.querySelector('form[name="profile-info"]');
const formEditAvatar = document.querySelector('form[name="avatar-update"]');
const buttonClosePopupAvatarUpdate = document.querySelector('.popup__close-button_avatar-update');
const buttonEditAvatar = document.querySelector('.profile__edit-photo-button');
const inputAvatar = document.querySelector('#image-link');
const buttonClosePopupDeleteConfirmation = document.querySelector('.popup__close-button_delete-confirm');

function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

function handleDeleteClick(id, deleteCard) {
  popupWithConfirmation.open(id, deleteCard);
}

function handleLikeClick(id, isLiked, toggleLike) {
  if (isLiked) {
    api.removeLike(id)
      .then(res => {
        toggleLike(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.putLike(id)
      .then(res => {
        toggleLike(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function createCard(item, userId) {
  const card = new Card(item, handleCardClick, handleDeleteClick, handleLikeClick, '.element-template');
  return card.generateCard(userId);
}

const userInfo = new UserInfo({profileName: '.profile__name', profileDescription: '.profile__description', profileAvatar: '.profile__avatar'});
const api = new Api(apiConfig);

const initialCardsList = new Section({
  items: [],
  renderer: (cardItem) => {
    initialCardsList.addItem(createCard(cardItem, userInfo.getUserId()));
  }},
  '.elements'
);
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners(buttonClosePopupImage);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const data = {
      profilename: userData.name,
      profiledescription: userData.about,
      profileavatar: userData.avatar
    };
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    userInfo.setUserId(userData._id);

    cards.forEach((card) => {
      initialCardsList.addItem(createCard(card, userInfo.getUserId()));
    });
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_confirm',
  handleSubmitForm: (id, deleteFunc) => {
    api.deleteCard(id)
      .then(() => {
        deleteFunc();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

popupWithConfirmation.setEventListeners(buttonClosePopupDeleteConfirmation);

const popupWithFormTypeNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleSubmitForm: (formData, setButtonText, closeSuccess) => {
    setButtonText(true);
    api.postNewCard(formData)
        .then((cardData) => {
          initialCardsList.addItem(createCard(cardData, userInfo.getUserId()));
          closeSuccess();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setButtonText(false);
        });
  }
});

popupWithFormTypeNewCard.setEventListeners(buttonClosePopupNewCard);

buttonAddNewCard.addEventListener('click', function() {
  formNewCardValidator.disableSubmitButton();
  popupWithFormTypeNewCard.open();
});

const formNewCardValidator = new FormValidator(validationConfig, formNewCard);
formNewCardValidator.enableValidation();

const popupWithFormTypeEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar-update',
  handleSubmitForm: (formData, setButtonText, closeSuccess) => {
    setButtonText(true);
    api.patchUserAvatar(formData)
    .then(() => {
      api.getUserInfo()
        .then((userData) => {
          const data = {
            profileavatar: userData.avatar,
          };
          userInfo.setUserAvatar(data);
          closeSuccess();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(false);
    });
  }
});

popupWithFormTypeEditAvatar.setEventListeners(buttonClosePopupAvatarUpdate);

buttonEditAvatar.addEventListener('click', function() {
  formEditAvatarValidator.disableSubmitButton();
  const {userAvatar} = userInfo.getUserAvatar();
  inputAvatar.value = userAvatar;
  popupWithFormTypeEditAvatar.open();
});

const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();

const popupWithFormTypeEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleSubmitForm: (formData, setButtonText, closeSuccess) => {
    setButtonText(true);
    api.patchUserInfo(formData)
    .then(() => {
      api.getUserInfo()
        .then((userData) => {
          const data = {
            profilename: userData.name,
            profiledescription: userData.about
          };
          userInfo.setUserInfo(data);
          closeSuccess();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonText(false);
    });
  }
});

popupWithFormTypeEditProfile.setEventListeners(buttonClosePopupEditProfile);

buttonEditProfile.addEventListener('click', function() {
  const {userName, userDescription} = userInfo.getUserInfo();
  inputName.value = userName;
  inputJob.value = userDescription;
  popupWithFormTypeEditProfile.open();
});

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();

