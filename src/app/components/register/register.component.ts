import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import * as titles from '../../enums/titles.enum';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registrationForm: FormGroup;
    titles = titles;

    constructor(
        private fb: FormBuilder
    ) {
        this.registrationForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
            nickname: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]]
        });
    }

    /**
     * submits form
     */
    onSubmit() {
        if (this.registrationForm.valid) {
            console.log('Registration form data:', this.registrationForm.value);
            // Здесь можно добавить логику для отправки данных на сервер
        }
    }
}
