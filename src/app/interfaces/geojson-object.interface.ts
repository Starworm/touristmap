import {EventInterface} from "./event.interface";

export interface GeojsonObjectInterface {
    geometry: {
        coordinates: number[],
        type: string
    },
    properties: EventInterface,
    type: string
}
