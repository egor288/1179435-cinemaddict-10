import {renderExtraFilms} from "./components/extra-films";
import {renderFilmCard} from "./components/film-card";
import {renderFilms} from "./components/films.js";
import {renderFilters} from "./components/filters";
import {renderHeader} from "./components/header";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {renderNavigation} from "./components/navigation";
import {renderPopup} from "./components/popup";
import {renderSection} from "./components/section";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeader = document.querySelector(`header`);

render(siteHeader, renderHeader(), `beforebegin`);
render(siteMainElement, renderNavigation(), `beforeend`);
render(siteMainElement, renderFilters(), `beforeend`);
render(siteMainElement, renderSection(), `beforeend`);
const section = document.querySelector(`.films`);
render(siteMainElement, renderPopup(), `beforeend`);
render(section, renderFilms(), `beforeend`);
const filmsContaner = document.querySelector(`.films-list__container`);

for (let i = 0; i <= 4; i++) {
  render(filmsContaner, renderFilmCard(), `beforeend`);
}
render(section, renderExtraFilms(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
