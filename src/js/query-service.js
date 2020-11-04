export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
   fetchArticles() {
        const KEY = '18956584-3ac01e2418e4c39c7eb5dacd9';
        const SEACH_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
       return fetch(SEACH_URL).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.page += 1;
            return data.hits;
        })
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newSeachQuery) {
        this.searchQuery = newSeachQuery;
    }
}