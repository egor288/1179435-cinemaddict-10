import {createElement} from "../utils.js";
const renderfilmCard = (element) => {
  const durationMinutes = (elem) => {
    let minutes = Math.round(elem.duration % 60);
    if (minutes >= 0 && minutes <= 9) {
      return `0${minutes}`;
    }
    return minutes;
  };

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
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return renderfilmCard(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
