import Sort, {sortByDate, sortByRating, SortType} from "../components/filters";
import ExtraFilms from "../components/extra-films";
import Films from "../components/films";
import Popup from "../components/popup";
import LoadMoreButton from "../components/load-more-button";
import {render, remove, RenderPosition} from '../utils/render';
import NoFilms from "../components/no-data";
import MovieController from "./movie";

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
    this._sort = new Sort();
    this._onDataChange = this._onDataChange.bind(this);
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

    this._sort.setSortTypeChangeHandler((sort) => {
      this._onSortTypeChange(sort);
    });

    render(container, this._sort, RenderPosition.BEFOREEND);

    render(container, new Films(), RenderPosition.BEFOREEND);

    this._filmsContaner = document.querySelector(`.films-list__container`);

    this._renderFooter(this._films.length);

    this._renderFilmCards(0);


    if (this._films.length !== 0) {
      render(document.querySelector(`.films`), new ExtraFilms(), RenderPosition.AFTERBEGIN);
    }

    this._renderTopRated();
    this._renderMostCommented();

    this._renderLoadMoreButton();

  }


  _renderFilmCards(prevTasksCount) {
    this._films.slice(prevTasksCount, this._showingFilmsCount).forEach((card) => {

      const movie = new MovieController(this._filmsContaner, this._onDataChange, this._onViewChange);
      movie.render(card);
    });
  }


  _onDataChange(oldCard, newCard, controller) {

    let films = this._films;

    films[oldCard.id] = newCard;

    controller.render(newCard);

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
        const movie = new MovieController(extraFilmsRated, this._onDataChange, this._onViewChange);
        movie.render(topRatedArr[i]);
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
        const movie = new MovieController(extraFilmsCommented, this._onDataChange, this._onViewChange);
        movie.render(mostCommentedArr[i]);
      }
    }

  }

  _onViewChange(remover) {
    remover();
  }

  _renderSortedFilmCards(arr) {
    document.querySelectorAll(`.film-card`).forEach((element) => {
      element.remove();
    });

    arr.forEach((elem) => {
      const movie = new MovieController(this._filmsContaner, this._onDataChange, this._onViewChange);
      movie.render(elem);
    });
    this._renderTopRated();
    this._renderMostCommented();
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = sortByDate(this._films);
        break;
      case SortType.RATING:
        sortedFilms = sortByRating(this._films);
        break;
      case SortType.DEFAULT:
        sortedFilms = this._films.slice(0, this._showingFilmsCount);
        break;
    }

    this._renderSortedFilmCards(sortedFilms);


    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButton);
    }
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButton);

    document.querySelector(`.films-list--extra`).remove();
    document.querySelector(`.films-list--extra`).remove();


    const container = this._container.getElement();
    render(container, this._loadMoreButton, RenderPosition.BEFOREEND);

    this._loadMoreButton.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;

      this._showingFilmsCount = this._showingFilmsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      this._renderFilmCards(prevTasksCount);


      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButton);
      }
    });


    render(container, new ExtraFilms(), RenderPosition.BEFOREEND);

    this._renderTopRated();
    this._renderMostCommented();

  }

  _onLoadMoreButtonClick() {

    this._loadMoreButton.setClickHandler();
  }

  // _onFilmCardClick(popupId) {
  //   const OnPopupEscPres = (evt) => {
  //     if (evt.keyCode === ESC_KEYCODE) {
  //       document
  //         .querySelector(`.film-details__close-btn`)
  //         .removeEventListener(`click`, OnclosePopupBtn);
  //       document.removeEventListener(`keydown`, OnPopupEscPres);
  //       document
  //         .querySelector(`.main`)
  //         .removeChild(document.querySelector(`.film-details`));
  //     }
  //   };

  //   const OnclosePopupBtn = () => {
  //     document.removeEventListener(`keydown`, OnPopupEscPres);
  //     document
  //       .querySelector(`.film-details__close-btn`)
  //       .removeEventListener(`click`, OnclosePopupBtn);
  //     document.querySelector(`.main`).removeChild(this._popupsArr[popupId].getElement());
  //   };

  //   render(
  //       this._siteMainElement,
  //       this._popupsArr[popupId],
  //       RenderPosition.BEFOREEND
  //   );

  //   document
  //     .querySelector(`.film-details__close-btn`)
  //     .addEventListener(`click`, OnclosePopupBtn);

  //   document.addEventListener(`keydown`, OnPopupEscPres);
  // }

  _renderFooter(count) {
    const footer = document.querySelector(`.footer__statistics`);
    const filmsCount = footer.querySelector(`p`);
    filmsCount.textContent = `${count} movies inside`;
  }

}
