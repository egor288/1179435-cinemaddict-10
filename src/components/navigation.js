import {createElement} from "../utils.js";
export const renderNavigation = (data) => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${data.countFavorites}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${data.countHistory}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${data.countFavorites}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

export default class Navigation {
  constructor(counters) {
    this._counters = counters;
    this._element = null;
  }

  getTemplate() {
    return renderNavigation(this._counters);
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
