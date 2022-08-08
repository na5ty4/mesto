import {openPopUp, popupImage} from './PopupUtils.js';

export class Card {
    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._handleLikeToggle();
      });
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._handleDeleteCard();
      });
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleOpenImagePopup();
      });
    }
  
    _handleLikeToggle() {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }
  
    _handleDeleteCard() {
      this._element.remove();
    }
  
    _handleOpenImagePopup() {
      popupImage.querySelector('.popup__image').src = this._link;
      popupImage.querySelector('.popup__image').alt = this._name;
      popupImage.querySelector('.popup__image-title').textContent = this._name;
      openPopUp(popupImage);
  }
  };