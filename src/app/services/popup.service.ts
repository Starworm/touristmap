import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor() {
    }

    // TODO: Temporary solution (doesn't use, by the way). Should be a separate component with detailed description of attraction
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
