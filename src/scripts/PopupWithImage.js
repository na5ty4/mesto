import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        super.open();
        this._popupSelector.querySelector('.popup__image').src = link;
        this._popupSelector.querySelector('.popup__image').alt = link;
        this._popupSelector.querySelector('.popup__image-title').textContent = name;
    }
}

