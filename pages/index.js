const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__save-button');
let formElement = document.querySelector('.popup__content');
let nameInput = document.querySelector('.popup__profile-name');
let jobInput = document.querySelector('.popup__profile-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', function() {
    popup.classList.remove('popup_hidden');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
});

closeButton.addEventListener('click', function(){
    popup.classList.add('popup_hidden')
}
);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler); 

saveButton.addEventListener('click', formSubmitHandler);

saveButton.addEventListener('click', function(){
    popup.classList.add('popup_hidden')
}
);
