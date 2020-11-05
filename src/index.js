import './styles.scss';
import * as basicLightbox from 'basiclightbox';
import galeryListTempl from './templates/galery.hbs';
import ImageApiService from './js/query-service.js';

const refs = {
    galleryElem: document.querySelector('.gallery'),
    searchFormElem: document.querySelector('.search-form'),
    btnLoadMore:document.querySelector('.btn-load-more')
};
const imageApiService = new ImageApiService();
refs.searchFormElem.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.galleryElem.addEventListener('click', onOpenModal);
function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchArticles().then(appArtMarkup).finally(refs.btnLoadMore.style.display = 'block');
    clearArtMarkup();
}
function onLoadMore() {
    imageApiService.fetchArticles().then(appArtMarkup).finally(
            window.scrollTo({
    top: innerHeight*imageApiService.page,
    behavior: "smooth"
            })
    );
    console.log(innerHeight);
    console.log(innerHeight*imageApiService.page);
}
function appArtMarkup (hits) {
    refs.galleryElem.insertAdjacentHTML('beforeend', galeryListTempl(hits));
}
function clearArtMarkup () {
    refs.galleryElem.innerHTML = '';
}
function onOpenModal(e) {
    if (e.target.nodeName !== "IMG") {
    return;
  }
    const elem = e.target;
    const instance = basicLightbox.create(`<img src=${elem.getAttribute('data-url')}/>`);
 instance.show();
}
