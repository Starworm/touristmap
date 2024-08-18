import {Injectable} from '@angular/core';
import {EventInterface} from "../interfaces/event.interface";
import {of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    /** temporal local list of events that user joined to */
    myEventList: EventInterface[] = [];
    constructor() {
    }

    /**
     * adds an event to user's list
     * @param event
     */
    public addToMyEvents(event: EventInterface) {
        this.myEventList.push(event);
    }

    /**
     * remove an event to user's list
     * @param event
     */
    public removeFromMyEvents(event: EventInterface) {
        this.myEventList = this.myEventList.filter(el => el.id !== event.id);
    }

    /**
     * returns list of user's events
     */
    public getMyEvents() {
        return of(this.myEventList);
    }
}
