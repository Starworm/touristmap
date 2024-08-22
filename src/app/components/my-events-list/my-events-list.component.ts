import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {EventInterface} from "../../interfaces/event.interface";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import * as titles from '../../enums/titles.enum';

@Component({
    selector: 'app-my-events-list',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './my-events-list.component.html',
    styleUrl: './my-events-list.component.scss'
})
export class MyEventsListComponent implements OnInit {

    titles = titles;
    myEvents: EventInterface[] = [];

    constructor(
        private eventsService: EventsService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getMyEvents();
    }

    /**
     * returns to map
     */
    toMap() {
        this.router.navigate(['map']);
    }

    refuse(event: EventInterface) {
        this.eventsService.removeFromMyEvents(event);
        this.getMyEvents();
    }

    /**
     * gets user's events
     */
    getMyEvents() {
        this.eventsService.getMyEvents()
            .subscribe(res => {
                this.myEvents = res;
            })
    }
}
