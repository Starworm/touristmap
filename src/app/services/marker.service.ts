import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {PopupService} from "./popup.service";
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
        private popupService: PopupService
    ) {
    }

    /**
     * returns list of capitals by country id
     * @param id - country id
     */
    public getData(id: number): Observable<any> {
        if (id === 1) {
            return this.http.get(this.usCities)
        } if (id === 2) {
            return this.http.get(this.caCities)
        } if (id === 3) {
            return this.http.get(this.ukCities)
        }
        return of(null);
    }

    /**
     * scales radius depending on relationship to max value
     * @param val - scaled value
     * @param maxVal - max value
     * @private
     */
    private scaleRadius(val: number, maxVal: number): number {
        return 20 * val / maxVal;
    }
}
