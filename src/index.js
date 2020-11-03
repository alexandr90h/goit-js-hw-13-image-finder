import './styles.scss';
import galeryListTempl from './templates/galery.hbs';

let seachValue ='';
const NUMBER_PAGE = 1;
const KEY = '18956584-3ac01e2418e4c39c7eb5dacd9';
const SEACH_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${seachValue}&page=${NUMBER_PAGE}&per_page=12&key=${KEY}`;

const refs = {
    galeryElem: document.querySelector('.galery-section'),
    buttonSeachElem: document.querySelector('.search-form [type="button"]'),
    inputSeachElem: document.querySelector('.search-form [type="text"]'),
};
console.log(refs.inputSeachElem);

refs.buttonSeachElem.addEventListener('click', seachImages);
function seachImages() {
    seachValue = refs.inputSeachElem.value;
    fetch(SEACH_URL).then(resolve => {
        return resolve.json();
    }).then(data => {
        console.log(data);
    }).catch();
}