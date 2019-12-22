import {render, RenderPosition} from "./utils";
import ExtraFilms from "./components/extra-films";
import FilmCard from "./components/film-card";
import Films from "./components/films.js";
import Filter from "./components/filters";
import Header from "./components/header";
import Navigation from "./components/navigation";
import Popup from "./components/popup";
import Section from "./components/section";
import NoFilms from "./components/no-data";
import {generateArr} from "./mock/film-card-mock";
export const films = generateArr(19);

const ESC_KEYCODE = 27;
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

render(
    siteHeader,
    new Header(countWatched()).getElement(),
    RenderPosition.BEFOREEND
);

render(
    siteMainElement,
    new Navigation(countFilters(films)).getElement(),
    RenderPosition.BEFOREEND
);

render(siteMainElement, new Filter().getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(siteMainElement, new NoFilms().getElement(), RenderPosition.BEFOREEND);
}

render(siteMainElement, new Section().getElement(), RenderPosition.BEFOREEND);

const section = document.querySelector(`.films`);

render(section, new Films().getElement(), RenderPosition.BEFOREEND);

const filmsContaner = document.querySelector(`.films-list__container`);

const footer = document.querySelector(`.footer__statistics`);
const filmsCount = footer.querySelector(`p`);
filmsCount.textContent = `${films.length} movies inside`;

let showingFilmsCount = SHOWING_CARDS_COUNT_ON_START;

const popups = [];

function cardAndPopup(prevTasksCount) {
  films.slice(prevTasksCount, showingFilmsCount).forEach((card) => {
    const filmCard = new FilmCard(card);
    render(filmsContaner, filmCard.getElement(), RenderPosition.BEFOREEND);
    const popup = new Popup(card);
    popups.push(popup);
  });
  return popups;
}

cardAndPopup();

if (films.length !== 0) {
  render(section, new ExtraFilms().getElement(), RenderPosition.BEFOREEND);
}
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
    render(
        extraFilmsRated,
        new FilmCard(topRatedArr[i]).getElement(),
        RenderPosition.BEFOREEND
    );
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
        new FilmCard(mostCommentedArr[i]).getElement(),
        RenderPosition.BEFOREEND
    );
  }
}

function openPopupListner(event) {
  let popupId = event.currentTarget.id;

  const OnPopupEscPres = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      document
        .querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, OnclosePopupBtn);
      document.removeEventListener(`keydown`, OnPopupEscPres);
      document
        .querySelector(`.main`)
        .removeChild(document.querySelector(`.film-details`));
    }
  };

  const OnclosePopupBtn = () => {
    document.removeEventListener(`keydown`, OnPopupEscPres);
    document
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, OnclosePopupBtn);
    document.querySelector(`.main`).removeChild(popups[popupId].getElement());
  };

  render(
      siteMainElement,
      popups[popupId].getElement(),
      RenderPosition.BEFOREEND
  );
  document
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, OnclosePopupBtn);

  document.addEventListener(`keydown`, OnPopupEscPres);
}

let allCards = document.querySelectorAll(`.film-card`);

allCards.forEach(function (element) {
  element.addEventListener(`click`, openPopupListner);
});

const loadMoreButton = document.querySelector(`.films-list__show-more`);
if (films.length === 0) {
  loadMoreButton.remove();
}
loadMoreButton.addEventListener(`click`, () => {
  allCards.forEach(function (element) {
    element.removeEventListener(`click`, openPopupListner);
  });

  const prevTasksCount = showingFilmsCount;

  showingFilmsCount = showingFilmsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
  cardAndPopup(prevTasksCount);
  allCards = document.querySelectorAll(`.film-card`);

  allCards.forEach(function (element) {
    element.addEventListener(`click`, openPopupListner);
  });

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
