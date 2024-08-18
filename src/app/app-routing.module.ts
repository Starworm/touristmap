import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapComponent} from "./components/map/map.component";
import {LoginComponent} from "./components/login/login.component";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";
import {RegisterComponent} from "./components/register/register.component";
import {MyEventsListComponent} from "./components/my-events-list/my-events-list.component";

const routes: Routes = [
    {path: 'map', component: MapComponent},
    {path: 'login', component: LoginComponent},
    {path: 'resetpassword', component: PasswordResetComponent},
    {path: 'newuser', component: RegisterComponent},
    {path: 'my-events', component: MyEventsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
