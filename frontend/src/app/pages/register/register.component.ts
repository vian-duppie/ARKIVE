import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { navigateToPage } from '../../globals'
import { User } from 'src/app/models/user';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

    constructor
    (
        private http: HttpClient, 
        private router: Router,
        private userService: UserService,
        private authService: AuthService
    ) {}

    test: string;

    /* Navigates to the specified Page */
    onNavigate( page: string ) {
        navigateToPage( this.router, page )
    }
    /* End of - Navigates to the specified Page */

    /* Form Input Fields */
    name: string = ''
    email: string = ''
    password: string = ''
    /* End of - Form Input Fields */
    
    /* Form Input Errors */
    errors = {
        name: '',
        email: '',
        password: ''
    };
    /* End of Form Input Errors */

    /* Register a user */
    registerUser() {
        if (!this.name) {
            this.errors.name = 'Please fill in your name'
        }
    
        if (!this.email) {
            this.errors.email = 'Please fill out your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            this.errors.email = 'Please enter a valid email address.'
        }
    
        if (!this.password) {
            this.errors.password = 'Please choose a password'
        }

        const errorsEmpty = Object.values(this.errors).some(x => x !== null && x !== '') 
    
        if (errorsEmpty) {
            return;
        }
    
        const data: User = {
            name: this.name,
            email: this.email,
            password: this.password
        };

        this.userService.register( data ).pipe(
            tap( res => {
                if ( !res.status ) {
                    this.errors.email = res.message
                    this.email = ''
                    throw new Error(res.message);
                }
            })
            ).subscribe({
                next: ( res ) => {
                    navigateToPage( this.router, '/login' )   
                }
            })
    }
    /* End of Register a user */

    /* Clear Register Form Input Fields */
    clearInputFields(){
        this.name = ''
        this.email = ''
        this.password = ''
    }
    /* End of Clear Register Form Input Fields */

    /* Clear Register Form Errors */
    clearErrors() {
        this.errors.name = ''
        this.errors.email = ''
        this.errors.password = ''
    }
    /* End of Clear Register Form Errors */
    
    /* Check if input value are chaning */
    onTextChanged(text: string, input: string) {
        switch(input) {
            case 'name':
                this.name = text
                this.errors.name = ''
                break;
            case 'email':
                this.email = text
                this.errors.email = ''
                break;
            case 'password':
                this.password = text
                this.errors.password = ''
                break;
        }
    }
    /* End of Check if input value are chaning */

    /* Function for verifying a user */
    userId: string;

    ngOnInit() {
        this.authService.authenticateUser()
    }
}
