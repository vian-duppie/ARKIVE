import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { navigateToPage } from 'src/app/globals';
import { UserService } from 'src/app/services/user.service';
import { InputComponent } from 'src/app/components/input/input.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor 
    (
        private router: Router,
        private userService: UserService,
        private authService: AuthService
    ) {}

    /* Navigates to the specified Page */
    onNavigate( page: string ) {
        navigateToPage( this.router, page )
    }
    /* End of - Navigates to the specified Page */

    /* Input Field */
    verificationCode: string;
    /* Input Field */
    
    /* Input Error */
    error: string = '';
    /* Input Error */

    /* Check if input value are chaning */
    onTextChanged( text: string ) {
        this.error = ''
        this.verificationCode = text
    }
    /* End of Check if input value are chaning */

    /* Login User */
    loginUser() {
        if ( !this.verificationCode ) {
            this.error = 'Please enter your verification code'
        }

        if ( this.error ) {
            return;
        }

        /* Send Code to Backend and Verify */
        this.userService.login( this.verificationCode ).pipe(
            tap(res => {
                if (!res.status) {
                    this.error = res.message;
                    throw new Error(res.message);
                }
            })
            ).subscribe({
                next: (res) => {
                    navigateToPage( this.router, '/home' )
                },
                error: (err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.error = err.error.message;
                    }
                }
            }
        );


    }
    /* Login User */

    ngOnInit() {
        this.authService.authenticateUser()
    }
}
