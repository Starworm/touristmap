/**
 * interface for a country from backend
 */
export interface CountryInterface {
    id: number,
    /** country's name */
    name?: string,
    /** country's latitude coordinates */
    latitude: number,
    /** country's longitude coordinates */
    longitude: number,
    /** zoom size to country */
    zoom: number
}
