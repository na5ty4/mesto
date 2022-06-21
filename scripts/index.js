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
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButtonEditProfile = document.querySelector('.popup__close-button_edit-profile');
const closeButtonNewCard = document.querySelector('.popup__close-button_new-card');
const closeButtonImagePopup = document.querySelector('.popup__close-button_image-popup');
const addButton = document.querySelector('.profile__add-button');
const formElementEditProfile = document.querySelector('.popup__content_purpose_edit-profile');
const formElementNewCard = document.querySelector('.popup__content_purpose_new-card');
const nameInput = document.querySelector('#profile-name');
const jobInput = document.querySelector('#profile-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');
const placeName = document.querySelector('#card-name');
const placeLink = document.querySelector('#card-link');

function openPopUp(popup) {
  popup.classList.add('popup_opened');
};

function openImagePopup(name, link) {
  popupImage.querySelector('.popup__image').src = link;
  popupImage.querySelector('.popup__image').alt = name;
  popupImage.querySelector('.popup__image-title').textContent = name;
  openPopUp(popupImage);
}

function deleteCard(item) {
  item.remove();
};

function createCard(cardData) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = cardData.link;
  newElement.querySelector('.element__image').alt = cardData.name;
  newElement.querySelector('.element__title').textContent = cardData.name;
  newElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  newElement.querySelector('.element__delete-button').addEventListener('click', function() {
    deleteCard(newElement);
  });
  newElement.querySelector('.element__image').addEventListener('click', function() {
    openImagePopup(cardData.name, cardData.link);
  });
  return newElement;
};

function renderCard(card) {
  elements.prepend(card);
};

initialCards.forEach((card) => {
  renderCard(createCard(card));
});

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
};

function createUserCard(evt) {
    evt.preventDefault(); 
    formElementNewCard.link = placeLink.value;
    formElementNewCard.name = placeName.value;
    renderCard(createCard(formElementNewCard));
    closePopUp(popupNewCard);
};

addButton.addEventListener('click', function() {
  openPopUp(popupNewCard);
  placeName.value = '';
  placeLink.value = '';
});

editButton.addEventListener('click', function() {
    openPopUp(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

closeButtonEditProfile.addEventListener('click', function() {
  closePopUp(popupEditProfile)
});

closeButtonNewCard.addEventListener('click', function() {
  closePopUp(popupNewCard)
});

closeButtonImagePopup.addEventListener('click', function() {
  closePopUp(popupImage)
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopUp(popupEditProfile);
};

formElementEditProfile.addEventListener('submit', formSubmitHandler); 

formElementNewCard.addEventListener('submit', createUserCard);


