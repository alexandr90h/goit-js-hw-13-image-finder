import './styles.scss';
import * as basicLightbox from 'basiclightbox';
import galeryListTempl from './templates/galery.hbs';
import ImageApiService from './js/query-service.js';

const refs = {
    bodyElem: document.querySelector('body'),
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
    imageApiService.fetchArticles().then(appArtMarkup);
    clearArtMarkup();
    if (appArtMarkup) {
        setTimeout(() => {
                refs.btnLoadMore.style.display = 'block';
        }, 500);
    }
}
function onLoadMore() {
    setTimeout(() => {
        window.scrollTo({
        top: refs.bodyElem.clientHeight-1250,
        behavior: "smooth"
    });    
    }, 1000);
    imageApiService.fetchArticles().then(appArtMarkup);
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
