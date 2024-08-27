import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {CountryInterface} from "../interfaces/country.interface";

@Injectable()
export class CountriesService {

    countries: CountryInterface[] = [
        {id: 1, name: 'United States', latitude: 37.0902, longitude: -95.7129, zoom: 5},
        {id: 2, name: 'Canada', latitude: 56.1304, longitude: -106.3468, zoom: 5},
        {id: 3, name: 'United Kingdom', latitude: 55.3781, longitude: -3.4360, zoom: 6},
    ];

    constructor() {
    }

    /**
     * returns list of countries from backend
     */
    getCountries(): Observable<CountryInterface[]> {
        return of(this.countries);
    }
}
