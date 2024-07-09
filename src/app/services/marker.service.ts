import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {PopupService} from "./popup.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    private capitals: string = '/assets/data/usa-capitals.geojson';
    constructor(
        private http: HttpClient,
        private popupService: PopupService
    ) {
    }

    /**
     * adds a standard marker to the map according to coordinates
     * @param map - the map
     */
    public makeCapitalMarkers(map: L.Map): void {
        this.http.get(this.capitals)
            .subscribe((res: any) => {
                for (const c of res.features) {
                    const lon = c.geometry.coordinates[0];
                    const lat = c.geometry.coordinates[1];
                    const marker = L.marker([lat, lon]);

                    marker.addTo(map);
                }
        })
    }

    public getData(): Observable<any> {
        return this.http.get(this.capitals)
    }

    /**
     * adds a circle to the map according to coordinates
     * @param map - the map
     */
    public makeCapitalCircleMarkers(map: L.Map): void {
        this.http.get(this.capitals)
            .subscribe((res: any) => {
                const maxPop = Math.max(...res.features.map((el: any) => el.properties.population), 0);
                for (const c of res.features) {
                    const lon = c.geometry.coordinates[0];
                    const lat = c.geometry.coordinates[1];
                    const circle = L.circleMarker([lat, lon], {
                        radius: this.scaleRadius(c.properties.population, maxPop)
                    });
                    circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));

                    circle.addTo(map);
                }
            })
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
