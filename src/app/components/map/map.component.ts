import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";
import {ShapeService} from "../../services/shape.service";
import {Layer} from "leaflet";

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
export class MapComponent implements AfterViewInit {
    /** leaflet map object */
    private map: any;
    /** list of US states */
    private states: any;

    constructor(
        private markerService: MarkerService,
        private shapeService: ShapeService
    ) {
    }

    /**
     * map initialization
     * @private
     */
    private initMap(): void {
        // initial map position
        this.map = L.map('map', {
            center: [39.343, -98.493],
            zoom: 3
        });

        // provider of map (currently OpenStreetMap)
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
    }

    /**
     * creates a layer with US state with changing color while mouse hovering
     * @private
     */
    private initStatesLayer() {
        const stateLayer = L.geoJson(this.states, {
            style: (feature) => ({
                weight: 3,
                opacity: 0.5,
                color: '#008f68',
                fillOpacity: 0.8,
                fillColor: '#6db65b'
            }),
            onEachFeature: (feature: any, layer: Layer) => {
                layer.on({
                    mouseover: (e) => (this.highlightFeatures(e)),
                    mouseout: (e) => (this.resetFeature(e)),
                })
            }
        });
        this.map.addLayer(stateLayer);
        stateLayer.bringToBack();
    }

    /**
     * highlights element
     * @param e
     * @private
     */
    private highlightFeatures(e: any) {
        const layer = e.target;

        layer.setStyle({
            weight: 10,
            opacity: 1.0,
            color: '#DFA612',
            fillOpacity: 1.0,
            fillColor: '#FAE042'
        });
    }

    /**
     * resets element color
     * @param e
     * @private
     */
    private resetFeature(e: any) {
        const layer = e.target;

        layer.setStyle({
            weight: 3,
            opacity: 0.5,
            color: '#008f68',
            fillOpacity: 0.8,
            fillColor: '#6DB65B'
        });
    }

    ngAfterViewInit(): void {
        this.initMap();
        // this.markerService.makeCapitalMarkers(this.map);
        this.markerService.makeCapitalCircleMarkers(this.map);
        this.shapeService.getStateShapes()
            .subscribe(states => {
                this.states = states;
                this.initStatesLayer();
            })
    }

}
