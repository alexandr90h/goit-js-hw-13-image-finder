import './styles.scss';
import * as basicLightbox from 'basiclightbox';
import galeryListTempl from './templates/galery.hbs';
import ImageApiService from './js/query-service.js';

// const basicLightbox = require('basiclightbox');
const refs = {
    galleryElem: document.querySelector('.gallery'),
    searchFormElem: document.querySelector('.search-form'),
    btnLoadMore:document.querySelector('.btn-load-more')
};
const imageApiService = new ImageApiService();
// const instanse = basicLightbox();
refs.searchFormElem.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.galleryElem.addEventListener('click', onOpenModal);
function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchArticles().then(appArtMarkup);
    clearArtMarkup();
    refs.btnLoadMore.style.display = 'block';
}
function onLoadMore() {
    imageApiService.fetchArticles().then(appArtMarkup);
//     window.scrollTo({
//     top: innerHeight,
//     behavior: "smooth"
// });
}
function appArtMarkup (hits) {
    refs.galleryElem.insertAdjacentHTML('beforeend', galeryListTempl(hits));
}
function clearArtMarkup () {
    refs.galleryElem.innerHTML = '';
}
function onOpenModal(e) {
    const elem = e.target;
    console.log(elem);
    const instance = basicLightbox.create(elem);
    instance.show();
    console.log(instance);
}