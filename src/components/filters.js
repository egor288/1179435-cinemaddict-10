import {createElement} from "../utils.js";
import {films} from "../main.js";
const renderFilters = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

export const sortByDate = () => {
  let newFilms = films.slice(0);
  newFilms.sort(function (a, b) {
    return b.year - a.year;
  });
  return newFilms;
};

export const sortByRating = () => {
  let newFilms = films.slice(0);
  newFilms.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return newFilms;
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return renderFilters(this._filters);
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
