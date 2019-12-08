import {renderExtraFilms} from "./components/extra-films";
import {renderfilmCards} from "./components/film-card";
import {renderFilms} from "./components/films.js";
import {renderFilters} from "./components/filters";
import {renderHeader} from "./components/header";
import {renderNavigation} from "./components/navigation";
import {renderPopup} from "./components/popup";
import {renderSection} from "./components/section";
import {filmCards} from "./mock/film-card-mock";

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const countFilters = (filmsArr) => {
  let result = {};
  result.countWatchlist = 0;
  result.countHistory = 0;
  result.countFavorites = 0;
  filmsArr.forEach(function (element) {
    if (element.favorite === true) {
      result.countFavorites++;
    }
    if (element.watched === true) {
      result.countHistory++;
    }
    if (element.watchlist === true) {
      result.countWatchlist++;
    }
  });
  return result;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeader = document.querySelector(`header`);

render(siteHeader, renderHeader(15), `beforebegin`);

render(siteMainElement, renderNavigation(countFilters(filmCards)), `beforeend`);

render(siteMainElement, renderFilters(), `beforeend`);

render(siteMainElement, renderSection(), `beforeend`);

const section = document.querySelector(`.films`);

render(section, renderFilms(), `beforeend`);

const filmsContaner = document.querySelector(`.films-list__container`);

const footer = document.querySelector(`.footer__statistics`);
const filmsCount = footer.querySelector(`p`);
filmsCount.textContent = `${filmCards.length} movies inside`;

let showingTasksCount = SHOWING_CARDS_COUNT_ON_START;
filmCards
  .slice(0, showingTasksCount)
  .forEach((card) => render(filmsContaner, renderfilmCards(card), `beforeend`));

render(section, renderExtraFilms(), `beforeend`);

const extraFilmsRated = document.querySelector(`.topRated`);
const extraFilmsCommented = document.querySelector(`.mostCommented`);
let topRatedArr = filmCards.slice(0);
let mostCommentedArr = filmCards.slice(0);

topRatedArr.sort(function (a, b) {
  return b.rating - a.rating;
});

if (topRatedArr[0] !== 0) {
  for (let i = 0; i < 2; i++) {
    render(extraFilmsRated, renderfilmCards(topRatedArr[i]), `beforeend`);
  }
}

mostCommentedArr.sort(function (a, b) {
  return b.comments.length - a.comments.length;
});

if (mostCommentedArr[0] !== 0) {
  for (let i = 0; i < 2; i++) {
    render(
        extraFilmsCommented,
        renderfilmCards(mostCommentedArr[i]),
        `beforeend`
    );
  }
}

const openPopupListner = (event) => {
  render(
      siteMainElement,
      renderPopup(filmCards[event.currentTarget.id]),
      `beforeend`
  );
  document.querySelector(`.film-details`).addEventListener(`click`, function () {
    document
      .querySelector(`.main`)
      .removeChild(document.querySelector(`.film-details`));
  });
};

let allCards = document.querySelectorAll(`.film-card`);

allCards.forEach(function (element) {
  element.addEventListener(`click`, openPopupListner);
});

const loadMoreButton = document.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  allCards.forEach(function (element) {
    element.removeEventListener(`click`, openPopupListner);
  });

  const prevTasksCount = showingTasksCount;

  showingTasksCount = showingTasksCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  filmCards
    .slice(prevTasksCount, showingTasksCount)
    .forEach((card) => render(filmsContaner, renderfilmCards(card), `beforeend`));

  allCards = document.querySelectorAll(`.film-card`);

  allCards.forEach(function (element) {
    element.addEventListener(`click`, openPopupListner);
  });

  if (showingTasksCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});
