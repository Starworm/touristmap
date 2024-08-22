/**
 * interface for a country from backend
 */
export interface CountryInterface {
    /** country's id */
    id: number,
    /** country's name */
    name?: string,
    /** country's latitude coordinates */
    lat: number,
    /** country's longitude coordinates */
    lon: number,
    /** zoom size to country */
    zoom: number
}
