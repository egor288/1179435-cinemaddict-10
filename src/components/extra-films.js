import AbstractComponent from "./abstract-component.js";
export const renderExtraFilms = () => {
  return `<div class="films">
            <section class="films-list--extra">
              <h2 class="films-list__title">Top rated</h2>
              <div class="films-list__container topRated"></div>
            </section>
            <section class="films-list--extra">
              <h2 class="films-list__title">Most commented</h2>
              <div class="films-list__container mostCommented"></div>
            </section></div>`;
};

export default class ExtraFilms extends AbstractComponent {
  getTemplate() {
    return renderExtraFilms();
  }
}
