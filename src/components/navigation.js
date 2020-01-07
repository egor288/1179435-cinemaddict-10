import AbstractComponent from "./abstract-component.js";
export const renderNavigation = (data) => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${data.countFavorites}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${data.countHistory}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${data.countFavorites}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

export default class Navigation extends AbstractComponent {
  constructor(navigation) {
    super();

    this._navigation = navigation;
  }

  getTemplate() {
    return renderNavigation(this._navigation);
  }
}
