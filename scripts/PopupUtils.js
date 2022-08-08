
const popupImage = document.querySelector('.popup_type_image');

function handleEscClose(evt) {
    if (evt.key === "Escape"){
        const popupActive = document.querySelector('.popup_opened');
        closePopUp(popupActive);
    }
};

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
};
  
function openPopUp(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
};

export{openPopUp, closePopUp, popupImage};