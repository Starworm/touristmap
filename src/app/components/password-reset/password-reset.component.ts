import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import * as titles from '../../enums/titles.enum';

@Component({
  selector: 'app-password-reset',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
    resetForm: FormGroup;
    message: string | null = null;
    titles = titles;
    constructor(
        private fb: FormBuilder
    ) {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    /**
     * sends pass reset request to backend
     */
    onSubmit() {
        if (this.resetForm.valid) {
            const email = this.resetForm.value.email;
            // TODO: send request to backend
            this.message = `A password reset link has been sent to ${email}`;
            this.resetForm.reset();
        }
    }
}
