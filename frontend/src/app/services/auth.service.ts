import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor
    (
        private router: Router, private http: HttpClient
    ) { }

    userId: string

    ngOnInit() {
        this.authenticateUser()
        console.log(this.userId)
    }

    authenticateUser(): Promise<string> {
        return new Promise( (resolve, reject) => {

            
            const token = localStorage.getItem('token')

            if (!token) {
                if (this.router.url != '/login') {
                    this.router.navigate(['/register']);
                }
                return
            }
            this.http.post('http://localhost:3000/api/auth', { token: token })
            .subscribe(( res: any ) => {
                console.log("hey")
                if (!res.status) {
                    if (this.router.url != '/login') {
                        this.router.navigate(['/register']);
                    }
                    reject('Authentication failed');
                    return;
                }

                if (this.router.url === '/register' || this.router.url === '/login') {
                    this.router.navigate(['/inventory']);
                }
        
                this.userId = res.decoded.userId;
                resolve(res.decoded.userId);
            })
        })
    }
}
