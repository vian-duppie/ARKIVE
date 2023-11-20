import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    image: string = '../../../assets/images/about_image.png'

    constructor
    (
        private http: HttpClient, 
        private router: Router, 
    ) {}
    ngOnInit() {
        const token = localStorage.getItem('token')

        this.http.post('http://localhost:3000/api/auth', { token: token })
            .subscribe((res: any) => {
                if (!res.status) {
                    this.router.navigate(['/register'])
                    return;
                } 
                this.userId = res.decoded.userId
            }
        );
    }

    /* Navigate to Inventory */
    navigateToInventory() {
        this.router.navigate(['/inventory'])
    }
    /* End of Navigate To Inventory */

    userId: string = ''
}