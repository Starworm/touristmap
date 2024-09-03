import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './components/map/map.component';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {RegisterComponent} from "./components/register/register.component";

@NgModule({ declarations: [
        AppComponent,
        MapComponent,
        NavbarComponent,
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
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
