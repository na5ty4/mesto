import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._element = this._popup.querySelector('.popup__form');
    }

    setEventListeners(buttonClosePopup) {
        super.setEventListeners(buttonClosePopup);
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._currentId, () => { this._processDelete(); });
        });
    }

    open(id, deleteCard) {
        super.open();
        this._currentId = id;
        this._deleteFunc = deleteCard;
    }

    _processDelete() {
        this._deleteFunc();
        this.close();
    }
}