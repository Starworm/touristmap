import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";
import {ShapeService} from "../../services/shape.service";
import {CountriesService} from "../../services/countries.service";
import 'leaflet.markercluster';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    /** leaflet map object */
    private map: L.Map;
    /** list of US states */
    private states: any;
    /** list of countries */
    public countryList: any;
    /** leaflet cluster object */
    private markerClusterGroup: L.MarkerClusterGroup;

    constructor(
        private markerService: MarkerService,
        private shapeService: ShapeService,
        private countriesService: CountriesService
    ) {
    }

    ngOnInit() {
        this.initMap();
    }
    /**
     * map initialization
     * @private
     */
    private initMap(): void {
        // initial map position
        this.countriesService.getCountries()
            .subscribe((countries) => {
                this.countryList = countries;
                this.map = L.map('map', {
                    center: [39.343, -98.493],
                    zoom: 3
                });
            })


        // provider of map (currently OpenStreetMap)
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
    }

    public zoomToCountry(coords: any, zoomLevel: number = 5) {
        this.map.setView([coords.lat, coords.lon], coords.zoom ? coords.zoom : zoomLevel);
        if (this.markerClusterGroup) {
            this.markerClusterGroup.clearLayers();
        }
        this.markerService.getData(coords.id)
            .subscribe((res) => {
                this.markerClusterGroup = L.markerClusterGroup();
                L.geoJSON(res).addTo(this.markerClusterGroup);
                this.markerClusterGroup.addTo(this.map);
            })
    }

}
