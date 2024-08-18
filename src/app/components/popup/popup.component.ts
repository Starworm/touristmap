import {Component, Input, OnInit} from '@angular/core';
import {EventInterface} from "../../interfaces/event.interface";
import {DatePipe} from "@angular/common";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-popup',
  standalone: true,
    imports: [
        DatePipe
    ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {
    @Input() event: EventInterface;
    /** if user joined to event or not */
    public isJoinedToEvent: boolean = false;
    /** 'join' button's text */
    public JOINED = 'Already joined';
    public NOT_JOINED = 'Join';
    public buttonJoinText = '';

    constructor(
        private eventsService: EventsService
    ) {
    }

    ngOnInit(): void {
        this.event.time = this.timeSplit(this.event.date);
        this.getMyEvents();
    }

    timeSplit(dateTime: string) {
        return dateTime.split('T')[1];
    }

    /**
     * adds an event to list of my events
     * @param event
     */
    addToMyEvent(event: EventInterface) {
        this.eventsService.addToMyEvents(event);
        this.getMyEvents();

    }

    /**
     * remove an event from list of my events
     * @param event
     */
    removeFromMyEvent(event: EventInterface) {
        this.eventsService.removeFromMyEvents(event);
        this.getMyEvents();
    }

    /**
     * gets list of my events
     */
    getMyEvents() {
        this.eventsService.getMyEvents()
            .subscribe(res => {
                this.isJoinedToEvent = res.find(el => el.id === this.event.id) === undefined;
                this.buttonJoinText = this.isJoinedToEvent ? this.NOT_JOINED : this.JOINED;
            })
    }
}
