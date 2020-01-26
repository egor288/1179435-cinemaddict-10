import {render, RenderPosition} from '../utils/render.js';
import FilmCard from "../components/film-card";
import Popup from "../components/popup";
// import {films}  from '../main.js';

const ESC_KEYCODE = 27;
const siteMainElement = document.querySelector(`.main`);

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCard = null;
    this._popup = null;
    this._isPopupOpen = false;
    this._onViewChange = onViewChange;
  }


  render(filmCard) {
    const oldFilmCard = this._filmCard;
    const oldPopup = this._popup;
    this._popup = new Popup(filmCard);
    this._filmCard = new FilmCard(filmCard);
    const _changeButtonData = (card, button) => {
      const oldCard = card;
      const newCard = card;

      if (button === `watchList`) {
        newCard.watchlist = !card.watchlist;
      } else if (button === `history`) {
        newCard.watched = !card.watched;
      } else if (button === `favorite`) {
        newCard.favorite = !card.favorite;
      }

      this._onDataChange(newCard, oldCard, this);
    };

    const _setEmojy = (value) => {
      const emojyContaner = document.querySelector(`.film-details__add-emoji-label`);
      if (value === `neutral-face`) {
        emojyContaner.innerHTML = `<img src="./images/emoji/smile.png" width="70" height="70" alt="emoji">`;
      } else if (value === `sleeping`) {
        emojyContaner.innerHTML = `<img src="./images/emoji/sleeping.png" width="70" height="70" alt="emoji">`;
      } else if (value === `grinning`) {
        emojyContaner.innerHTML = `<img src="./images/emoji/puke.png" width="70" height="70" alt="emoji">`;
      } else if (value === `angry`) {
        emojyContaner.innerHTML = `<img src="./images/emoji/angry.png" width="70" height="70" alt="emoji">`;
      }
    };

    if (this._isPopupOpen) {
      document.querySelector(`main`).replaceChild(this._popup.getElement(), oldPopup.getElement());
      this.showPopup();

    }

    if (oldFilmCard === null) {
      render(this._container, this._filmCard, RenderPosition.BEFOREEND);
    } else {
      this._container.replaceChild(this._filmCard.getElement(), oldFilmCard.getElement());
    }

    this._filmCard.setOpenPopupClickHandler(() => {
      this._onFilmCardClick();
    });

    this._filmCard.setAddToWatchlistClickHandler(_changeButtonData);
    this._filmCard.setMarkAsWatchedClickHandler(_changeButtonData);
    this._filmCard.setFavoriteClickHandler(_changeButtonData);

    this._popup.setEmojyChangeClickHandler(_setEmojy);
    this._popup.setAddToWatchlistClickHandler(_changeButtonData);
    this._popup.setMarkAsWatchedClickHandler(_changeButtonData);
    this._popup.setFavoriteClickHandler(_changeButtonData);

    this._popup.recoveryListeners();
  }

  removePopup() {

    this._popup.getElement()
    .querySelector(`.film-details__close-btn`)
    .removeEventListener(`click`, this._onClosePopupBtn);

    document.removeEventListener(`keydown`, this._onPopupEscPress);

    siteMainElement.removeChild(document.querySelector(`.film-details`));
    this._isPopupOpen = false;
  }

  showPopup() {
    if (document.querySelectorAll(`.film-details`).length >= 1) {
      this._onViewChange(() =>{
        this.removePopup();
      });
    }

    if (!this._isPopupOpen) {
      this._isPopupOpen = true;

      render(
          siteMainElement,
          this._popup,
          RenderPosition.BEFOREEND
      );


      this._onPopupEscPress = (evt) => {

        if (evt.keyCode === ESC_KEYCODE) {
          this.removePopup();
        }
      };


      document.addEventListener(`keydown`, this._onPopupEscPress);

    }

    this._onClosePopupBtn = () => {
      this.removePopup();
    };

    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onClosePopupBtn);

  }


  _onFilmCardClick() {
    this.showPopup();
  }
}
