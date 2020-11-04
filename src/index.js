import './styles.scss';
import galeryListTempl from './templates/galery.hbs';

const refs = {
    galeryElem: document.querySelector('.gallery-box'),
    searchFormElem: document.querySelector('.search-form'),
    // buttonSeachElem: document.querySelector('.search-form [type="button"]'),
    // inputSeachElem: document.querySelector('.search-form [type="text"]'),
    // btnLoadMore:document.querySelector('.btn-load-more')
};


refs.searchFormElem.addEventListener('submit', onSearch);
function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    // const option = {
    // headers: {
    //     key: '18956584-3ac01e2418e4c39c7eb5dacd9',
    //     }
    // }
    console.log(searchQuery);
  const KEY = '18956584-3ac01e2418e4c39c7eb5dacd9';
const NUMBER_PAGE = 1;
const SEACH_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${KEY}`;
fetch(SEACH_URL).then(resolve => {
        return resolve.json();
}).then(data => {
        console.log(data);
        const { hits } = data;
        const arrImgUrl = hits.map(({webformatURL})=>webformatURL);
        refs.galeryElem.innerHTML = galeryListTempl({ arrImgUrl });
        // refs.btnLoadMore.style.display = 'block';
    }).catch();

}
// console.log(refs.inputSeachElem);
// refs.inputSeachElem.addEventListener('input', valSeach);
// refs.buttonSeachElem.addEventListener('click', seachImages);
// refs.btnLoadMore.addEventListener('click', loadMoreRender);
// function seachImages() {
//     fetch(SEACH_URL, option).then(resolve => {
//         return resolve.json();
//     }).then(data => {
//         const { hits } = data;
//         const arrImgUrl = hits.map(({webformatURL})=>webformatURL);
//         refs.galeryElem.innerHTML = galeryListTempl({ arrImgUrl });
//         refs.btnLoadMore.style.display = 'block';
//     }).catch();
// }
function loadMoreRender() {
    console.log('tfjtjtft');
}
function valSeach() {
    refs.inputSeachElem.value;
}
