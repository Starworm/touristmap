import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
        private fb: FormBuilder,
        private router: Router
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

    /**
     * navigates to reset password page
     */
    public forgetPassword() {
        this.router.navigate(['resetpassword']);
    }
}
