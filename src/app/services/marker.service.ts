import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    private usCities: string = '/assets/data/usa-cities.geojson';
    private caCities: string = '/assets/data/canada-cities.geojson';
    private ukCities: string = '/assets/data/uk-cities.geojson';

    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * returns list of country's attractions
     * @param id - country id
     */
    getData(id: number): Observable<any> {
        switch (id) {
            case 1:
                return this.http.get(this.usCities);
            case 2:
                return this.http.get(this.caCities);
            case 3:
                return this.http.get(this.ukCities);
            default:
                return of(null);
        }
    }
}
