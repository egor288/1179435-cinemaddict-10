import AbstractComponent from "./abstract-component.js";
// import {films} from "../main.js";

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const renderFilters = () => {
  return `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

export const sortByDate = (films) => {
  let newFilms = films.slice(0);
  newFilms = newFilms.sort(function (a, b) {
    return b.year - a.year;
  });
  return newFilms;
};

export const sortByRating = (films) => {
  let newFilms = films.slice(0);
  newFilms = newFilms.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return newFilms;
};

export default class Sort extends AbstractComponent {
  getTemplate() {
    return renderFilters();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
