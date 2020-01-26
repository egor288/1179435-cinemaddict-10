import AbstractComponent from "./abstract-component";
import {films} from "../main";
const renderfilmCard = (element) => {
  const durationMinutes = (elem) => {
    let minutes = Math.round(elem.duration % 60);
    if (minutes >= 0 && minutes <= 9) {
      return `0${minutes}`;
    }
    return minutes;
  };

  const activeClass = `film-card__controls-item--active`;

  let activeWatched = element.watched ? activeClass : ``;
  let activeFavorite = element.favorite ? activeClass : ``;
  let activeWatchlist = element.watchlist ? activeClass : ``;

  return `<article class="film-card" id="${element.id}">
          <h3 class="film-card__title">${element.title}</h3>
          <p class="film-card__rating">${element.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${element.year}</span>
            <span class="film-card__duration">${Math.round(
      element.duration / 60
  )}:${durationMinutes(element)}</span>
            <span class="film-card__genre">${element.genres1}</span>
          </p>
          <img  src="${
  element.poster
}" alt="постер фильма" class="film-card__poster">
          <p class="film-card__description">${element.description}</p>
          <a class="film-card__comments">${element.comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${activeWatchlist}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${activeWatched}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${activeFavorite}">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return renderfilmCard(this._card);
  }

  setOpenPopupClickHandler(handler) {
    this.setEventListener(handler, `.film-card__title`);
    this.setEventListener(handler, `img`);
    this.setEventListener(handler, `.film-card__comments`);
  }

  removeOpenPopupClickHandler(handler) {
    this.getElement().removeEventListener(`click`, handler);
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.id];
      const button = `watchList`;
      evt.preventDefault();

      handler(card, button);
    });
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.id];
      const button = `history`;
      evt.preventDefault();

      handler(card, button);
    });

  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.id];
      const button = `favorite`;
      evt.preventDefault();

      handler(card, button);
    });

  }

  setEventListener(handler, element) {
    this.getElement().querySelector(element).addEventListener(`click`, (evt) => {
      const popupId = evt.currentTarget.id;
      handler(popupId);
    });
  }
}
