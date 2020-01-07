import AbstractComponent from "./abstract-component.js";
export const renderSection = () => {
  return `<section class="films"></section>`;
};

export default class Section extends AbstractComponent {
  getTemplate() {
    return renderSection();
  }
}
