import './styles.scss';
import * as basicLightbox from 'basiclightbox';
import galeryListTempl from './templates/galery.hbs';
import ImageApiService from './js/query-service.js';
import Error from './js/error-log.js';

const refs = {
    bodyElem: document.querySelector('body'),
    formSectionElem:document.querySelector('.form-section'),
    galleryElem: document.querySelector('.gallery'),
    searchFormElem: document.querySelector('.search-form'),
    btnLoadMore:document.querySelector('.btn-load-more')
};
const imageApiService = new ImageApiService();
const error = new Error();

refs.searchFormElem.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.galleryElem.addEventListener('click', onOpenModal);

let intElemOffsetHeight = 0;

async function onSearch(e) {
        e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    try {
        if (imageApiService.query === '') {
            error.errorOnSeach();
            return;
        }
        imageApiService.resetPage();
        imageApiService.fetchArticles().then(arrt => {
            if (arrt.length === 0) {
                error.errorOnSeach();
                return;
            }
            clearArtMarkup();
            appArtMarkup(arrt);
            if (arrt.length < 12) {
                refs.btnLoadMore.style.display = 'none';
                error.errorOnMore();
            } else {
                refs.btnLoadMore.style.display = 'block';
            }
    })} catch (error) {
        console.log(error);
    }
}
async function onLoadMore() {
    try {
        imageApiService.fetchArticles().then(arrt => {
            intElemOffsetHeight = refs.galleryElem.offsetHeight;
            appArtMarkup(arrt);
            onScroll();
            if (arrt.length < 12) {
                refs.btnLoadMore.style.display = 'none';
                error.errorOnMore();
            } else {
                refs.btnLoadMore.style.display = 'block';
            }
        });
    } catch (error) {
        console.log(error);
    }
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
async function onScroll() {
    try {
        window.scrollTo({
        top: intElemOffsetHeight+refs.formSectionElem.offsetHeight,
        behavior: "smooth"
    });    
    } catch (error) {
        console.log(error);
    }
}
