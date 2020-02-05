import {render, RenderPosition} from "./utils/render";
import Header from "./components/header";
import Navigation from "./components/navigation";
import {generateArr} from "./mock/film-card-mock";
import PageController from './controllers/films.js';
import Section from "./components/section";
import Movie from "./models/movies";
export const films = generateArr(19);


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
    new Header(countWatched()),
    RenderPosition.BEFOREEND
);

render(
    siteMainElement,
    new Navigation(countFilters(films)),
    RenderPosition.BEFOREEND
);

const movie = new Movie();
movie.setFilm(films);


const SectionComponent = new Section();
render(siteMainElement, SectionComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(SectionComponent, siteMainElement, movie);

pageController.render();


