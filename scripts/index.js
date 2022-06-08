const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__profile-name');
let jobInput = document.querySelector('.popup__profile-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function closePopUp () {
    popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

closeButton.addEventListener('click', closePopUp);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopUp();
};

formElement.addEventListener('submit', formSubmitHandler); 


