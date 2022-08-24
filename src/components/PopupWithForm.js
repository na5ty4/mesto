import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._element = this._popup.querySelector('.popup__form');
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._saveButton = this._element.querySelector('.popup__save-button');
        this._defaultText = this._saveButton.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _setSaveButtonText(isChanging) {
        if (isChanging) {
            this._saveButton.textContent = 'Сохранение...';
        } else {
            this.close();
            this._saveButton.textContent = this._defaultText;
        }
    }

    setEventListeners(buttonClosePopup) {
        super.setEventListeners(buttonClosePopup);
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues(), (isChanging) => { this._setSaveButtonText(isChanging); });
        });
    }

    close() {
        super.close();
        this._element.reset();
    }
}