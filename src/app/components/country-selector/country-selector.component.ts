import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectedCountryInterface} from "../../interfaces/selected-country.interface";
import {CountryInterface} from "../../interfaces/country.interface";

@Component({
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent {

    /** list of countries for selector */
    @Input() countryList: CountryInterface[];
    /** emitter of a selected country */
    @Output() private selectedCountry = new EventEmitter<SelectedCountryInterface>();

    /**
     * emits selected value in country selector
     * @param event
     */
    onCountryChange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        const result = selectedValue.split(',').map((coord: string) => parseFloat(coord));
        const selCountry: SelectedCountryInterface = {
            lat: result[0],
            lon: result[1],
            zoom: result[2],
            id: result[3]
        }
        this.selectedCountry.emit(selCountry);
    }

}
