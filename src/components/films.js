import {createElement} from "../utils.js";
export const renderFilms = () => {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">

      </div>
      <button class="films-list__show-more">Show more</button>
    </section>`;
};

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return renderFilms();
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
