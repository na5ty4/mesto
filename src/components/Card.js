export class Card {
    constructor(data, handleCardClick, handleDeleteClick, handleLikeClick, templateSelector) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._ownerId = data.owner._id;
      this._cardTemplate = document.querySelector(templateSelector);
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._deleteButton = this._element.querySelector('.element__delete-button');
      this._elementLikeButton = this._element.querySelector('.element__like-button');
    }
  
    _getTemplate() {
      return this._cardTemplate
        .content
        .querySelector('.element')
        .cloneNode(true);
    }
  
    generateCard(userId) {
      this._setEventListeners();
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._likeCounter.textContent = this._likes.length;
      if (userId != this._ownerId) {
        this._deleteButton.remove();
      }
      if (this._likes.some((item) => { return item._id == userId; })) {
        this._elementLikeButton.classList.add('element__like-button_active');
      }
      return this._element;
    }
  
    _setEventListeners() {
      this._elementLikeButton.addEventListener('click', () => {
        const isLiked = this._elementLikeButton.classList.contains('element__like-button_active');
        this._handleLikeClick(this._id, isLiked, (updatedLikeCounter) => { this._handleLikeToggle(updatedLikeCounter); });
      });
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id, () => { this._handleDeleteCard(); });
      });
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
    }
  
    _handleLikeToggle(updatedLikeCounter) {
      this._elementLikeButton.classList.toggle('element__like-button_active');
      this._likeCounter.textContent = updatedLikeCounter;
    }
  
    _handleDeleteCard() {
      this._element.remove();
    }
  };