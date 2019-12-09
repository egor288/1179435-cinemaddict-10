import {films} from "../main.js";

export const renderFilters = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

export const sortByDate = () => {
  let newFilms = films.slice(0);
  newFilms.sort(function (a, b) {
    return b.year - a.year;
  });
  return newFilms;
};

export const sortByRating = () => {
  let newFilms = films.slice(0);
  newFilms.sort(function (a, b) {
    return b.rating - a.rating;
  });
  return newFilms;
};
