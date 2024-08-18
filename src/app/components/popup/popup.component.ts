import {Component, Input, OnInit} from '@angular/core';
import {EventInterface} from "../../interfaces/event.interface";
import {DatePipe} from "@angular/common";

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

    ngOnInit(): void {
        console.log(this.event);
        this.event.time = this.timeSplit(this.event.date);
    }

    timeSplit(dateTime: string) {
        return dateTime.split('T')[1];
    }
}
