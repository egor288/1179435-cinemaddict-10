export const renderfilmCards = (element) => {
  return `
        <article class="film-card" id="${element.id}">
          <h3 class="film-card__title">${element.title}</h3>
          <p class="film-card__rating">${element.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${element.year}</span>
            <span class="film-card__duration">${element.durationH}h ${element.durationM}m</span>
            <span class="film-card__genre">Musical</span>
          </p>
          <img  src="${element.poster}" alt="постер фильма" class="film-card__poster">
          <p class="film-card__description">${element.description}</p>
          <a class="film-card__comments">${element.comments.length}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>
      `;
};
