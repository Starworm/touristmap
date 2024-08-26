/**
 * interface for a selected country from the selector
 */
export interface SelectedCountryInterface {
    id: number,
    /** country's latitude coordinates */
    lat: number,
    /** country's longitude coordinates */
    lon: number,
    /** zoom size to country */
    zoom: number
}
