import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

    constructor 
    (
        private router: Router,
        private itemService: ItemService,
        private http: HttpClient
    ) {}

    locations: any;
    userId: string = '';

    loading: boolean = true

    ngOnInit() {
        const token = localStorage.getItem('token')

        /* Authenticates User */
        this.http.post('http://localhost:3000/api/auth', { token: token })
        .subscribe((res: any) => {
            if (!res.status) {
                this.router.navigate(['/register'])
                return;
            } 
            if (this.router.url == '/register') {
                this.router.navigate(['/inventory'])
            }
        /* End of Authenticates User */

                /* Gets User Id From Token Stored In Local Storage */
                this.userId = res.decoded.userId

                /* User Locations */
                this.http.get(`http://localhost:3000/locations/${this.userId}`)
                    .subscribe((res: any) => {
                        this.locations = res
                        console.log(res)
                    })
                /* End of User Locations */
            }
        );
    }

    showModal: boolean = false;
    itemId: string = ''
    openModal() {
        this.showModal = true
    }

    closeModal() {
        this.showModal = false
        this.http.get(`http://localhost:3000/locations/${this.userId}`)
        .subscribe((res: any) => {
            this.locations = res
            console.log(res)
        })
    }
    /* End of Show/Hide Item Modal */
}
