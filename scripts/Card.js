import {openPopUp, popupImage, popupImageTitle, popupImageSrc} from './popupUtils.js';

export class Card {

    constructor(data, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
    }
  
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    }
  
    generateCard() {
      this._setEventListeners();
  
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
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
      this._elementImage.addEventListener('click', () => {
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
      popupImageSrc.src = this._link;
      popupImageSrc.alt = this._name;
      popupImageTitle.textContent = this._name;
      openPopUp(popupImage);
  }
  };