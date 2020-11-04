import './styles.scss';
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
    window.scrollTo({
    top: innerHeight,
    behavior: "smooth"
});
}
function appArtMarkup (hits) {
    refs.galleryElem.insertAdjacentHTML('beforeend', galeryListTempl(hits));
}
function clearArtMarkup () {
    refs.galleryElem.innerHTML = '';
}