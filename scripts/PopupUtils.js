const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__image-title');

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

export{openPopUp, closePopUp, popupImage, popupImageSrc, popupImageTitle};