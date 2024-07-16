import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";
import {CountriesService} from "../../services/countries.service";
import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';
import * as attraction from '../../enums/attractions.enum';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    private iconRetinaUrl = 'assets/marker-icon-2x.png';
    private iconUrl = 'assets/marker-icon.png';
    private shadowUrl = 'assets/marker-shadow.png';
    private iconDefault: L.Icon<L.IconOptions>;

    /** leaflet map object */
    private map: L.Map;
    /** list of countries */
    public countryList: any;
    /** leaflet cluster object */
    private markerClusterGroup: any;

    /** leaflet layer groups */
    private monumentGroup: L.Layer[] = [];
    private caveGroup: L.Layer[] = [];
    private waterfallGroup: L.Layer[] = [];
    private overlayMaps: any;

    /** ????? */
    private monumentSubGroup: any;
    private caveSubGroup: any;
    private waterfallSubGroup: any;

    /** ????  */
    monuments: any;
    caves: any;
    waterfalls: any;

    private layerControl: any;

    // Initial map settings
    private LATITUDE_INIT = 0;
    private LONGITUDE_INIT = 0;
    private ZOOM_INIT = 3;
    private ZOOM_MAX = 18;
    private ZOOM_MIN = 3;

    // Map's provider settings
    private MAP_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private MAP_ATTRIBUTES = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    constructor(
        private markerService: MarkerService,
        private countriesService: CountriesService
    ) {
    this.iconDefault = L.icon({
            iconRetinaUrl: this.iconRetinaUrl,
            iconUrl: this.iconUrl,
            shadowUrl: this.shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
    }

    ngOnInit() {
        L.Marker.prototype.options.icon = this.iconDefault;
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
                    center: [this.LATITUDE_INIT, this.LONGITUDE_INIT],
                    zoom: this.ZOOM_INIT
                });
            })


        // provider of map (currently OpenStreetMap)
        const tiles = L.tileLayer(this.MAP_TEMPLATE, {
            maxZoom: this.ZOOM_MAX,
            minZoom: this.ZOOM_MIN,
            attribution: this.MAP_ATTRIBUTES
        });

        tiles.addTo(this.map);
    }

    /**
     * zooms to country when it is selected
     * @param coords - country's coordinates
     * @param zoomLevel - level of country's zoom
     */
    public zoomToCountry(coords: any, zoomLevel: number = 5) {
        this.map.setView([coords.lat, coords.lon], coords.zoom ? coords.zoom : zoomLevel);
        if (this.markerClusterGroup) {
            this.markerClusterGroup.clearLayers();
        }
        // if (this.waterfalls) {
        //     this.waterfalls.clearLayers();
        // }
        // if (this.monuments) {
        //     this.monuments.clearLayers();
        // }
        // if (this.caves) {
        //     this.caves.clearLayers();
        // }
        // if(this.layerControl) {
        //     this.map.removeLayer(this.overlayMaps);
        // }
        // this.markerClusterGroup.current?.remove();

        this.markerService.getData(coords.id)
            .subscribe((res) => {
                this.markerClusterGroup = L.markerClusterGroup();

                res.features.forEach((el: any) => {
                    switch (el.properties.type) {
                        case attraction.AttractionsEnum.monument:
                            const monument = L.marker([el.geometry.coordinates[1], el.geometry.coordinates[0]]).bindPopup('a monument');
                            this.monumentGroup.push(monument);
                            break;
                        case attraction.AttractionsEnum.cave:
                            const cave = L.marker([el.geometry.coordinates[1], el.geometry.coordinates[0]]).bindPopup('a cave');
                            this.caveGroup.push(cave);
                            break;
                        case attraction.AttractionsEnum.waterfall:
                            const waterfall = L.marker([el.geometry.coordinates[1], el.geometry.coordinates[0]]).bindPopup('a waterfall');
                            this.waterfallGroup.push(waterfall);
                            break;
                        default: throw new Error('No such types!');
                    }
                })

                // this.markerClusterGroup = L.markerClusterGroup();
                // L.geoJSON(res).addTo(this.markerClusterGroup);
                // this.markerClusterGroup.addTo(this.map);

                // @ts-ignore
                this.monumentSubGroup = L.featureGroup.subGroup(this.monumentGroup);
                // @ts-ignore
                this.waterfallSubGroup = L.featureGroup.subGroup(this.waterfallGroup);
                // @ts-ignore
                this.caveSubGroup = L.featureGroup.subGroup(this.caveGroup);

                this.waterfalls = L.layerGroup(this.waterfallGroup).addTo(this.map);
                this.monuments = L.layerGroup(this.monumentGroup).addTo(this.map);
                this.caves = L.layerGroup(this.caveGroup).addTo(this.map);

                this.overlayMaps = {
                    'Monuments': this.monuments,
                    'Waterfalls': this.waterfalls,
                    'Caves': this.caves
                }

                this.markerClusterGroup.addTo(this.map);
                this.monumentSubGroup.addTo(this.map);
                this.caveSubGroup.addTo(this.map);
                this.waterfallSubGroup.addTo(this.map);


                this.layerControl = L.control.layers(undefined, this.overlayMaps).addTo(this.map);
            })
    }

}
