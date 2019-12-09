import {renderExtraFilms} from "./components/extra-films";
import {renderfilmCard} from "./components/film-card";
import {renderFilms} from "./components/films.js";
import {renderFilters} from "./components/filters";
import {renderHeader} from "./components/header";
import {renderNavigation} from "./components/navigation";
import {renderPopup} from "./components/popup";
import {renderSection} from "./components/section";
import {generateArr} from "./mock/film-card-mock";
export const films = generateArr(19);

const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const countFilters = (filmsArr) => {
  let result = {};
  result.countWatchlist = 0;
  result.countHistory = 0;
  result.countFavorites = 0;
  filmsArr.forEach(function (element) {
    if (element.favorite) {
      result.countFavorites++;
    }
    if (element.watched) {
      result.countHistory++;
    }
    if (element.watchlist) {
      result.countWatchlist++;
    }
  });
  return result;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const countWatched = () => {
  let counter = 0;
  films.forEach(function (elem) {
    if (elem.watched) {
      counter++;
    }
  });
  return counter;
};

const siteMainElement = document.querySelector(`.main`);
const siteHeader = document.querySelector(`header`);

render(siteHeader, renderHeader(countWatched()), `beforebegin`);

render(siteMainElement, renderNavigation(countFilters(films)), `beforeend`);

render(siteMainElement, renderFilters(), `beforeend`);

render(siteMainElement, renderSection(), `beforeend`);

const section = document.querySelector(`.films`);

render(section, renderFilms(), `beforeend`);

const filmsContaner = document.querySelector(`.films-list__container`);

const footer = document.querySelector(`.footer__statistics`);
const filmsCount = footer.querySelector(`p`);
filmsCount.textContent = `${films.length} movies inside`;

let showingFilmsCount = SHOWING_CARDS_COUNT_ON_START;
films
  .slice(0, showingFilmsCount)
  .forEach((card) => render(filmsContaner, renderfilmCard(card), `beforeend`));

render(section, renderExtraFilms(), `beforeend`);

const extraFilmsRated = document.querySelector(`.topRated`);
const extraFilmsCommented = document.querySelector(`.mostCommented`);
let topRatedArr = films.slice(0);
let mostCommentedArr = films.slice(0);

topRatedArr.sort(function (a, b) {
  return b.rating - a.rating;
});

if (topRatedArr[0] !== 0) {
  let arrLength = topRatedArr.length > 2 ? 2 : topRatedArr.length;
  for (let i = 0; i < arrLength; i++) {
    render(extraFilmsRated, renderfilmCard(topRatedArr[i]), `beforeend`);
  }
}

mostCommentedArr.sort(function (a, b) {
  return b.comments.length - a.comments.length;
});

if (mostCommentedArr[0] !== 0) {
  let arrLength = topRatedArr.length > 2 ? 2 : topRatedArr.length;
  for (let i = 0; i < arrLength; i++) {
    render(
        extraFilmsCommented,
        renderfilmCard(mostCommentedArr[i]),
        `beforeend`
    );
  }
}

const openPopupListner = (event) => {
  render(
      siteMainElement,
      renderPopup(films[event.currentTarget.id]),
      `beforeend`
  );
  document
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, function () {
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

  const prevTasksCount = showingFilmsCount;

  showingFilmsCount = showingFilmsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  films
    .slice(prevTasksCount, showingFilmsCount)
    .forEach((card) => render(filmsContaner, renderfilmCard(card), `beforeend`));

  allCards = document.querySelectorAll(`.film-card`);

  allCards.forEach(function (element) {
    element.addEventListener(`click`, openPopupListner);
  });

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
