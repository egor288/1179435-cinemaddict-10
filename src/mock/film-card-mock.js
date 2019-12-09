function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const namesOfFilms = [
  `rutrum `,
  `Aliquam `,
  `efficitur `,
  `pharetra`,
  `aliquet `,
  `Fusce `,
  `ligula `,
  `amet`,
  `adipiscing `,
  `dolor `,
  `tristique `,
  `suscipit `,
  `euismod `,
  `tempus`
];

const posters = [
  `../images/posters/made-for-each-other.png`,

  `../images/posters/popeye-meets-sinbad.png`,

  `../images/posters/sagebrush-trail.jpg`,

  `../images/posters/santa-claus-conquers-the-martians.jpg`,

  `../images/posters/the-dance-of-life.jpg`,

  `../images/posters/the-great-flamarion.jpg`,

  `../images/posters/the-man-with-the-golden-arm.jpg`
];

const descriptions = text.split(`.`);
const randomDescription = () => {
  let filmDescription = ` `;
  for (let i = 1; i <= getRandomInRange(1, 3); i++) {
    filmDescription += `${
      descriptions[getRandomInRange(0, descriptions.length - 1)]
    }.`;
  }
  return filmDescription;
};

const trueOrFalse = () => {
  return getRandomInRange(0, 1) === 1;
};

const commentNames = [`Tim Macoveev`, `John Doe`, `User1`, `User2`, `User3`];

const emojis = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`
];

const generateComments = () => {
  let comments = [];
  for (let i = 0; i <= getRandomInRange(0, 10); i++) {
    let comment = {};
    comment.mesage = descriptions[getRandomInRange(0, descriptions.length - 1)];
    comment.userName =
      commentNames[getRandomInRange(0, commentNames.length - 1)];
    comment.date = `${getRandomInRange(2000, 2019)}/${getRandomInRange(
        1,
        12
    )}/${getRandomInRange(1, 30)}  ${getRandomInRange(
        0,
        23
    )}:${getRandomInRange(0, 59)}`;
    comment.emoji = emojis[getRandomInRange(0, emojis.length - 1)];
    comments.push(comment);
  }
  return comments;
};

const names = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`
];

const countrys = [
  `Russia`,
  `USA`,
  `UAE`,
  `Oman`,
  `Pakistan`,
  `Palau`,
  `Panama`,
  `New Guinea`,
  `Paraguay`,
  `Peru`
];

const genres = [
  `Action-adventure`,
  `Romantic comedie`,
  `Romance`,
  `Drama`,
  `Film-Noir`,
  `Mystery`
];

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export const generateArr = (filmsCount) => {
  const filmCards = [];
  for (let i = 0; i <= filmsCount; i++) {
    let card = {};
    card.id = i;
    card.title = namesOfFilms[getRandomInRange(0, namesOfFilms.length - 1)];
    card.rating = `${getRandomInRange(0, 10)}.${getRandomInRange(0, 9)}`;
    card.day = getRandomInRange(0, 30);
    card.month = months[getRandomInRange(0, months.length - 1)];
    card.year = getRandomInRange(1900, 2019);
    card.duration = `${getRandomInRange(60, 300)}`;
    card.poster = posters[getRandomInRange(0, posters.length - 1)];
    card.description = randomDescription();
    card.watched = trueOrFalse();
    card.favorite = trueOrFalse();
    card.watchlist = trueOrFalse();
    card.comments = generateComments();
    card.ageRating = getRandomInRange(0, 25);
    card.director = names[getRandomInRange(0, names.length - 1)];
    card.writers = `${names[getRandomInRange(0, names.length - 1)]}, ${
      names[getRandomInRange(0, names.length - 1)]
    }, ${names[getRandomInRange(0, names.length - 1)]}.`;
    card.actors = `${names[getRandomInRange(0, names.length - 1)]}, ${
      names[getRandomInRange(0, names.length - 1)]
    }, ${names[getRandomInRange(0, names.length - 1)]}.`;
    card.country = countrys[getRandomInRange(0, countrys.length - 1)];
    card.genres1 = genres[getRandomInRange(0, genres.length - 1)];
    card.genres2 = genres[getRandomInRange(0, genres.length - 1)];
    card.genres3 = genres[getRandomInRange(0, genres.length - 1)];
    filmCards.push(card);
  }
  return filmCards;
};
