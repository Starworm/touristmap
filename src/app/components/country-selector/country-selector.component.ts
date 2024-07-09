import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent {

    @Input() countryList: any;
    @Output() selectedCountry: EventEmitter<any> = new EventEmitter<any>();

    public onCountryChange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        const result = selectedValue.split(',').map(coord => parseFloat(coord));
        const coords = {
            lat: result[0],
            lon: result[1],
            zoom: result[2]
        }
        this.selectedCountry.emit(coords);
    }

}
