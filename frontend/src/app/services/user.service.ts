import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

/* This is what the response would be from the backend when a user logs in */
interface LoginResponse {
    error: any;
    token: string;
    userId: string;
    status: boolean;
    message: string;
}

interface Register {
    name: string;
    email: string;
    password: string;
    status: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api'

    constructor
    (
        private http: HttpClient,
        private authService: AuthService
    ) {}

    userId: string;

    login( verification_code: string ): Observable<LoginResponse> {
        const url = `${ this.apiUrl }/login`
        return this.http.post<LoginResponse>( url, { verification_code } ).pipe(
            tap( 
                res => {
                    localStorage.setItem( 'token', res.token )
                    this.setUserId( res.userId )
                }
            )
        )
    }

    register( userData: Object ): Observable<Register> {
        const url = `${ this.apiUrl }/register`
        return this.http.post<Register>( url, userData ).pipe(
            tap(
                res => {
                    console.log(res)
                }
            )
        )
    }

    logout(): void {
        localStorage.removeItem( 'token' )
        this.userId = ''
        console.log("We are logging out")
    }

    getToken(): string | null {
        return localStorage.getItem( 'token' )
    }

    async getUserId(): Promise<string> {
        return this.authService.authenticateUser();
    }

    setUserId( id: string ) {
        this.userId = id
    }

}