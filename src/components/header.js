import {createElement} from "../utils.js";
export const renderHeader = (number) => {
  const renderRank = (filmsCount) => {
    if (filmsCount <= 0) {
      return ` `;
    }
    if (filmsCount >= 1 && filmsCount <= 10) {
      return `novice`;
    }
    if (filmsCount >= 11 && filmsCount <= 20) {
      return `fan`;
    }
    if (filmsCount >= 21) {
      return `movie buff`;
    }
    return ` `;
  };

  return `<header class="header">
  <h1 class="header__logo logo">Cinemaddict</h1>
  <section class="header__profile profile">
    <p class="profile__rating">${renderRank(number)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
</header>`;
};

export default class Header {
  constructor(rank) {
    this._rank = rank;
    this._element = null;
  }

  getTemplate() {
    return renderHeader(this._rank);
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
