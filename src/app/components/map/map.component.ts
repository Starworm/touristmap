import {
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    DestroyRef,
    EmbeddedViewRef,
    inject,
    Injector,
    OnInit
} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";
import {CountriesService} from "../../services/countries.service";
import 'leaflet.markercluster';
import 'leaflet.featuregroup.subgroup';
import * as events from '../../enums/events.enum';
import {PopupComponent} from "../popup/popup.component";
import {EventInterface} from "../../interfaces/event.interface";
import {Router} from "@angular/router";
import {CountryInterface} from "../../interfaces/country.interface";
import {GeojsonObjectInterface} from "../../interfaces/geojson-object.interface";
import {MapConstantsEnum} from "../../enums/map-constants.enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {APP_ROUTES} from "../../app.routes";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    providers: [
        CountriesService,
        MarkerService
    ]
})
export class MapComponent implements OnInit {

    /** list of countries */
    countryList: CountryInterface[];
    /** Group layer for events  */
    concerts:  L.LayerGroup<L.Map>;
    boardgames:  L.LayerGroup<L.Map>;

    private iconRetinaUrl = 'assets/marker-icon-2x.png';
    private iconUrl = 'assets/marker-icon.png';
    private shadowUrl = 'assets/marker-shadow.png';
    private iconDefault: L.Icon<L.IconOptions>;

    private destroyRef = inject(DestroyRef);

    /** leaflet map object */
    private map: L.Map;

    /** leaflet layer groups */
    private concertGroup: L.Layer[] = [];
    private boardgamesGroup: L.Layer[] = [];
    private overlayMaps: any;

    /** Subgroups for precise events */
    private concertSubGroup: L.FeatureGroup;
    private boardgamesSubGroup: L.FeatureGroup;

    /** Layer control object for adding group of events to the map */
    private layerControl: L.Control;

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
            iconSize: [MapConstantsEnum.ICON_SIZE_WIDTH, MapConstantsEnum.ICON_SIZE_HEIGHT],
            iconAnchor: [MapConstantsEnum.ICON_ANCHOR_WIDTH, MapConstantsEnum.ICON_ANCHOR_HEIGHT],
            popupAnchor: [MapConstantsEnum.POPUP_ANCHOR_X, MapConstantsEnum.POPUP_ANCHOR_Y],
            tooltipAnchor: [MapConstantsEnum.TOOLTIP_ANCHOR_X, MapConstantsEnum.TOOLTIP_ANCHOR_Y],
            shadowSize: [MapConstantsEnum.SHADOW_SIZE_WIDTH, MapConstantsEnum.SHADOW_SIZE_HEIGHT]
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
    zoomToCountry(coords: CountryInterface, zoomLevel: number = 5) {
        console.log(coords);
        this.map.setView([coords.latitude, coords.longitude], coords.zoom ?? zoomLevel);

        this.markerService.getData(coords.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((res) => {
                console.log(res);

                res.features.forEach((el: GeojsonObjectInterface) => {
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
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((countries) => {
                this.countryList = countries;
                this.map = L.map('map', {
                    center: [MapConstantsEnum.LATITUDE_INIT, MapConstantsEnum.LONGITUDE_INIT],
                    zoom: MapConstantsEnum.ZOOM_INIT
                });
            })


        // provider of map (currently OpenStreetMap)
        const tiles = L.tileLayer(this.MAP_TEMPLATE, {
            maxZoom: MapConstantsEnum.ZOOM_MAX,
            minZoom: MapConstantsEnum.ZOOM_MIN,
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

    /**
     * navigates to My events page
     */
    toMyEventsPage() {
        this.router.navigate([APP_ROUTES.myEvents]);
    }
}
