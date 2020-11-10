import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

export default class Error{
    constructor() {
        this.textNoFound = 'Sorry, no images found!';
        this.textNoMore = 'No more pictures!';
    }
    errorOnSeach() {
        return error({
            text: this.textNoFound,
            title: 'ERROR',
            delay: 2000,
            maxTextHeight: null,
            sticker: false,
        })
    }
    errorOnMore() {
                return error({
            text: this.textNoMore,
            title: 'ERROR',
            delay: 2000,
            maxTextHeight: null,
            sticker: false,
        })

    }
}