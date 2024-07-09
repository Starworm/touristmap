import {Injectable} from '@angular/core';
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    public countries = [
        {id: 1, name: 'United States', lat: 37.0902, lon: -95.7129, zoom: 5},
        {id: 2, name: 'Canada', lat: 56.1304, lon: -106.3468, zoom: 5},
        {id: 3, name: 'United Kingdom', lat: 55.3781, lon: -3.4360, zoom: 6},
    ];

    constructor() {
    }

    public getCountries() {
        return of(this.countries);
    }
}
