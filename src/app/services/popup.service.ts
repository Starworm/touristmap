import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor() {
    }

    /**
     * returns a html-template of popup message
     * @param data
     */
    public makeCapitalPopup(data: any): string {
        return `` +
            `<div>Capital: ${ data.name }</div>` +
            `<div>State: ${ data.state }</div>` +
            `<div>Population: ${ data.population }</div>`
    }
}
