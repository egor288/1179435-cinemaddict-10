
import ExtraFilms from "../components/extra-films";
import FilmCard from "../components/film-card";
import Films from "../components/films.js";
import Popup from "../components/popup";
import LoadMoreButton from "../components/load-more-button.js";
import {render, remove, RenderPosition} from '../utils/render.js';
import NoFilms from "../components/no-data";

const ESC_KEYCODE = 27;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container, siteMainElement, films) {
    this._container = container;
    this._siteMainElement = siteMainElement;
    this._films = films;
    this._loadMoreButton = new LoadMoreButton();
    this._showingFilmsCount = SHOWING_CARDS_COUNT_ON_START;
    this._popupsArr = [];
  }


  render() {

    if (this._films.length === 0) {
      render(this._siteMainElement, new NoFilms(), RenderPosition.BEFOREEND);
      return;
    }

    const createPopups = (filmCards) => {
      let popups = [];
      filmCards.forEach((card) => {
        const popup = new Popup(card);
        popups.push(popup);
      });
      return popups;
    };

    this._popupsArr = createPopups(this._films);

    const container = this._container.getElement();
    render(container, new Films(), RenderPosition.BEFOREEND);

    this._filmsContaner = document.querySelector(`.films-list__container`);

    this._renderFooter(this._films.length);

    this._renderFilmCards(0);

    this._renderLoadMoreButton();

    if (this._films.length !== 0) {
      render(container, new ExtraFilms(), RenderPosition.BEFOREEND);
    }

    this._renderTopRated();
    this._renderMostCommented();

  }

  _renderFilmCards(prevTasksCount) {
    this._films.slice(prevTasksCount, this._showingFilmsCount).forEach((card) => {
      const filmCard = new FilmCard(card);

      render(this._filmsContaner, filmCard, RenderPosition.BEFOREEND);
      filmCard.setClickHandler((popupId) => {
        this._onFilmCardClick(popupId);
      });
    });
  }

  _renderTopRated() {
    const extraFilmsRated = document.querySelector(`.topRated`);
    let topRatedArr = this._films.slice(0);

    topRatedArr.sort(function (a, b) {
      return b.rating - a.rating;
    });

    if (topRatedArr[0] !== 0) {
      let arrLength = topRatedArr.length > 2 ? 2 : topRatedArr.length;
      for (let i = 0; i < arrLength; i++) {
        const filmCard = new FilmCard(topRatedArr[i]);
        render(
            extraFilmsRated,
            filmCard,
            RenderPosition.BEFOREEND
        );
        filmCard.setClickHandler((popupId) => {
          this._onFilmCardClick(popupId);
        });
      }
    }

  }

  _renderMostCommented() {
    const extraFilmsCommented = document.querySelector(`.mostCommented`);

    let mostCommentedArr = this._films.slice(0);

    mostCommentedArr.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    if (mostCommentedArr[0] !== 0) {
      let arrLength = mostCommentedArr.length > 2 ? 2 : mostCommentedArr.length;
      for (let i = 0; i < arrLength; i++) {
        const filmCard = new FilmCard(mostCommentedArr[i]);
        render(
            extraFilmsCommented,
            filmCard,
            RenderPosition.BEFOREEND
        );
        filmCard.setClickHandler((popupId) => {
          this._onFilmCardClick(popupId);
        });
      }
    }

  }


  _renderLoadMoreButton() {

    let allCards = document.querySelectorAll(`.film-card`);

    remove(this._loadMoreButton);

    const container = this._container.getElement();
    render(container, this._loadMoreButton, RenderPosition.BEFOREEND);
    this._loadMoreButton.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;

      this._showingFilmsCount = this._showingFilmsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      this._renderFilmCards(prevTasksCount);

      allCards = document.querySelectorAll(`.film-card`);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _onLoadMoreButtonClick() {

    this._loadMoreButton.setClickHandler();
  }

  _onFilmCardClick(popupId) {
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
      document.querySelector(`.main`).removeChild(this._popupsArr[popupId].getElement());
    };

    render(
        this._siteMainElement,
        this._popupsArr[popupId],
        RenderPosition.BEFOREEND
    );

    document
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, OnclosePopupBtn);

    document.addEventListener(`keydown`, OnPopupEscPres);
  }

  _renderFooter(count) {
    const footer = document.querySelector(`.footer__statistics`);
    const filmsCount = footer.querySelector(`p`);
    filmsCount.textContent = `${count} movies inside`;
  }

}
