import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    /** login form object */
    public loginForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    /**
     * handles login form
     */
    public onSubmit() {
        if(this.loginForm.valid) {
            const { username, password } = this.loginForm.value;
            console.log('username', username);
            console.log('password', password);
            // TODO: request to end-point
        }
    }
}
