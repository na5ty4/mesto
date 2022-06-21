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
const popup = document.querySelector('.popup');
const popupNewCard = document.querySelector('.popup_new-card');
const popupImage = document.querySelector('.image-popup');
const closeButton = document.querySelector('.popup__close-button');
const closeButtonNewCard = document.querySelector('.popup__close-button_new-card');
const closeButtonImagePopup = document.querySelector('.popup__close-button_image-popup');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__content');
const formElementNewCard = document.querySelector('.popup__content_new-card');
let nameInput = document.querySelector('#profile-name');
let jobInput = document.querySelector('#profile-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');
let placeName = document.querySelector('#card-name');
let placeLink = document.querySelector('#card-link');

function openPopUp(pop) {
  pop.classList.add('popup_opened');
};

function openImagePopup(name, link) {
  popupImage.querySelector('.image-popup__image').src = link;
  popupImage.querySelector('.image-popup__title').textContent = name;
  openPopUp(popupImage);
}

/*function likeCard(elem) {
  elem.classList.toggle('element__like-button_active');
};*/

function renderCard(item) {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__image').src = item.link;
    newElement.querySelector('.element__title').textContent = item.name;
    newElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like-button_active');
    });
    newElement.querySelector('.element__delete-button').addEventListener('click', function() {
      deleteCard(newElement);
    });
    newElement.querySelector('.element__image').addEventListener('click', function() {
      openImagePopup(item.name, item.link);
    });

    elements.prepend(newElement);
};

initialCards.forEach(renderCard);

function createCard(evt) {
    evt.preventDefault(); 
    formElementNewCard.link = placeLink.value;
    formElementNewCard.name = placeName.value;
    renderCard(formElementNewCard);
    closePopUp(popupNewCard);
};



function closePopUp(pop) {
    pop.classList.remove('popup_opened');
};

addButton.addEventListener('click', function() {
  openPopUp(popupNewCard);
  placeName.value = '';
  placeLink.value = '';
});

function deleteCard(item) {
  item.remove();
};

editButton.addEventListener('click', function() {
    openPopUp(popup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

closeButton.addEventListener('click', function() {
  closePopUp(popup)
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
    closePopUp(popup);
};

formElement.addEventListener('submit', formSubmitHandler); 

formElementNewCard.addEventListener('submit', createCard);


