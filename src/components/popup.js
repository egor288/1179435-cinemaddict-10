import {formatTime, formatDate, formatDateForComment} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {films} from "../main";

const rateButtons = `<div class="form-details__middle-container">
<section class="film-details__user-rating-wrap">
  <div class="film-details__user-rating-controls">
    <button class="film-details__watched-reset" type="button">Undo</button>
  </div>

  <div class="film-details__user-score">
    <div class="film-details__user-rating-poster">
      <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
    </div>

    <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

      <p class="film-details__user-rating-feelings">How you feel it?</p>

      <div class="film-details__user-rating-score">
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
        <label class="film-details__user-rating-label" for="rating-1">1</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
        <label class="film-details__user-rating-label" for="rating-2">2</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
        <label class="film-details__user-rating-label" for="rating-3">3</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
        <label class="film-details__user-rating-label" for="rating-4">4</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
        <label class="film-details__user-rating-label" for="rating-5">5</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
        <label class="film-details__user-rating-label" for="rating-6">6</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
        <label class="film-details__user-rating-label" for="rating-7">7</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
        <label class="film-details__user-rating-label" for="rating-8">8</label>

        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked="">
        <label class="film-details__user-rating-label" for="rating-9">9</label>

      </div>
    </section>
  </div>
</section>
</div>`;

export const renderPopup = (filmCard) => {
  const formatDuration = (elem) => {
    return formatTime(elem.duration);
  };

  const formatReleaseDate = (elem) => {
    return formatDate(elem.year, elem.month, elem.day);
  };

  const formatCommentDate = (elem) => {
    return formatDateForComment(elem.date);
  };

  const renderComments = () => {
    let result = ``;
    filmCard.comments.forEach(function (comment) {
      result += ` <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="${comment.emoji}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.mesage}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.userName}</span>
                <span class="film-details__comment-day">${formatCommentDate(comment)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    });
    return result;
  };

  const activeClass = `film-details__watched-status--active`;

  let activeWatched = filmCard.watched ? activeClass : ``;
  let activeFavorite = filmCard.favorite ? activeClass : ``;
  let activeWatchlist = filmCard.watchlist ? activeClass : ``;

  return `<section class="film-details" id = "${filmCard.id}">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmCard.poster}" alt="">

          <p class="film-details__age">${filmCard.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmCard.title}</h3>
              <p class="film-details__title-original">Original: ${
  filmCard.title
}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmCard.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmCard.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmCard.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmCard.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatReleaseDate(filmCard)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatDuration(filmCard)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmCard.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${filmCard.genres1}</span>
                <span class="film-details__genre">${filmCard.genres2}</span>
                <span class="film-details__genre">${
  filmCard.genres3
}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">${filmCard.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${activeWatchlist}">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched ${activeWatched}">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${activeFavorite}">Add to favorites</label>
      </section>
    </div>

    ${filmCard.watched ? rateButtons : ``}

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${
  filmCard.comments.length
}</span></h3>

        <ul class="film-details__comments-list">
        ${renderComments()}

        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class Popup extends AbstractSmartComponent {
  constructor(popup) {
    super();

    this._popup = popup;
  }


  getTemplate() {
    return renderPopup(this._popup);
  }

  recoveryListeners() {

    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      const value = evt.target.value;

      this.changeEmojy(value);
    });

    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.parentNode.parentNode.id];
      const button = `watchList`;
      evt.preventDefault();

      this.addToWatchlistClickHandler(card, button);
    });

    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.parentNode.parentNode.id];
      const button = `history`;
      evt.preventDefault();

      this.markAsWatchedClickHandler(card, button);
    });

    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, (evt) => {
      const card = films[evt.target.parentNode.parentNode.parentNode.parentNode.id];
      const button = `favorite`;
      evt.preventDefault();

      this.favoriteClickHandler(card, button);
    });

  }

  rerender() {
    super.rerender();
  }


  setEmojyChangeClickHandler(handler) {
    this.changeEmojy = handler;
  }


  setAddToWatchlistClickHandler(handler) {
    this.addToWatchlistClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.markAsWatchedClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.favoriteClickHandler = handler;
  }

}
