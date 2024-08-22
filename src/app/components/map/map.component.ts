import {ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, Injector, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";
import {CountriesService} from "../../services/countries.service";
import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';
import * as events from '../../enums/eventsEnum';
import {PopupComponent} from "../popup/popup.component";
import {EventInterface} from "../../interfaces/event.interface";
import {Router} from "@angular/router";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    /** list of countries */
    countryList: any;
    /** ????  */
    concerts: any;
    boardgames: any;

    private iconRetinaUrl = 'assets/marker-icon-2x.png';
    private iconUrl = 'assets/marker-icon.png';
    private shadowUrl = 'assets/marker-shadow.png';
    private iconDefault: L.Icon<L.IconOptions>;

    /** leaflet map object */
    private map: L.Map;
    /** leaflet cluster object */
    private markerClusterGroup: any;

    /** leaflet layer groups */
    private concertGroup: L.Layer[] = [];
    private boardgamesGroup: L.Layer[] = [];
    private overlayMaps: any;

    /** ????? */
    private concertSubGroup: any;
    private boardgamesSubGroup: any;

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
        private countriesService: CountriesService,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef,
        private router: Router
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
     * zooms to country when it is selected
     * @param coords - country's coordinates
     * @param zoomLevel - level of country's zoom
     */
    zoomToCountry(coords: any, zoomLevel: number = 5) {
        this.map.setView([coords.lat, coords.lon], coords.zoom ? coords.zoom : zoomLevel);

        this.markerService.getData(coords.id)
            .subscribe((res) => {
                // this.markerClusterGroup = L.markerClusterGroup();

                res.features.forEach((el: any) => {
                    switch (el.properties.type) {
                        case events.EventsEnum.concert:
                            const concert = L.marker([el.geometry.coordinates[1], el.geometry.coordinates[0]]).bindPopup(this.createPopupComponent(el.properties)).openPopup();
                            this.concertGroup.push(concert);
                            break;
                        case events.EventsEnum.boardgames:
                            const boardgames = L.marker([el.geometry.coordinates[1], el.geometry.coordinates[0]]).bindPopup(this.createPopupComponent(el.properties)).openPopup();
                            this.boardgamesGroup.push(boardgames);
                            break;
                        default: throw new Error('No such types!');
                    }
                })

                // @ts-ignore
                this.concertSubGroup = L.featureGroup.subGroup(this.concertGroup);
                // @ts-ignore
                this.boardgamesSubGroup = L.featureGroup.subGroup(this.boardgamesGroup);

                this.concerts = L.layerGroup(this.concertGroup).addTo(this.map);
                this.boardgames = L.layerGroup(this.boardgamesGroup).addTo(this.map);

                this.overlayMaps = {
                    'Boardgames': this.boardgames,
                    'Concerts': this.concerts,
                }

                this.concertSubGroup.addTo(this.map);
                this.boardgamesSubGroup.addTo(this.map);

                this.layerControl = L.control.layers(undefined, this.overlayMaps).addTo(this.map);
            })
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
     * shows a popup with event description for a clicked marker
     * @param event
     * @private
     */
    private createPopupComponent(event: EventInterface): HTMLElement {
        const factory = this.resolver.resolveComponentFactory(PopupComponent);
        const componentRef = factory.create(this.injector);

        componentRef.instance.event = event;

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        return domElem;
    }

    toMyEvents() {
        this.router.navigate(['my-events']);
    }
}
