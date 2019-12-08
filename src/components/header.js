export const renderHeader = (number) => {
  return `<header class="header">
  <h1 class="header__logo logo">Cinemaddict</h1>

  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <span class="main-navigation__item-count profile__count">${number}</span>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
</header>`;
};
