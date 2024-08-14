import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {MarkerService} from "./services/marker.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {RegisterComponent} from "./components/register/register.component";

@NgModule({ declarations: [
        AppComponent,
        MapComponent,
        NavbarComponent,
        CountrySelectorComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        LeafletModule,
        RegisterComponent
    ], providers: [
        MarkerService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
