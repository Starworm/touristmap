import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {EventInterface} from "../../interfaces/event.interface";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import * as titles from '../../enums/titles.enum';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

    private destroyRef = inject(DestroyRef);

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

    /**
     * cancels an event from user's schedule
     * @param event - cancelled event
     */
    cancelEvent(event: EventInterface) {
        this.eventsService.removeFromMyEvents(event);
        this.getMyEvents();
    }

    /**
     * gets user's events
     */
    getMyEvents() {
        this.eventsService.getMyEvents()
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(res => {
                this.myEvents = res;
            })
    }
}
