export class Card {
    constructor(data, handleCardClick, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = document.querySelector(templateSelector);
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      return this._templateSelector
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
        this._handleCardClick(this._link, this._name);
      });
    }
  
    _handleLikeToggle() {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }
  
    _handleDeleteCard() {
      this._element.remove();
    }
  };