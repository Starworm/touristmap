import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ShapeService {

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * returns a list of US states
     */
    public getStateShapes() {
        return this.http.get('/assets/data/gz_2010_us_040_00_5m.json');
    }
}
