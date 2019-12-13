import {createElement} from "../utils.js";
export const renderSection = () => {
  return `<section class="films"></section>`;
};

export default class Section {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return renderSection();
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
