/* eslint-disable linebreak-style */
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.mainNavigation__list');
// eslint-disable-next-line func-names
burger.addEventListener('click', function () {
  this.classList.toggle('burger--active');
  navigation.classList.toggle('mainNavigation__list--active');
  // navigation.dataset.activeStatus = '1';
});
function getMainClassName(el) {
  return el.classList[0] ? el.classList[0].split('__')[0] : false;
}

// eslint-disable-next-line consistent-return
window.addEventListener('click', (event) => {
  if (
    getMainClassName(event.target) === 'burger'
    || getMainClassName(event.target) === 'mainNavigation'
  ) return false;
  if (burger.classList.contains('burger--active')) burger.classList.toggle('burger--active');
  if (navigation.classList.contains('mainNavigation__list--active')) navigation.classList.toggle('mainNavigation__list--active');
});
