/**
 * interface for a selected country from the selector
 */
export interface SelectedCountryInterface {
    id: number,
    /** country's latitude coordinates */
    latitude: number,
    /** country's longitude coordinates */
    longitude: number,
    /** zoom size to country */
    zoom: number
}
