import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent {
    constructor( private userService: UserService){}

    @Input() logoUrl: string = '../../../assets/logo/text-logo.svg';
    @Input() links: { text: string, url: string }[] = [    
        { text: 'About', url: '/home' },    
        { text: 'Inventory', url: '/inventory' },    
        { text: 'Crafting', url: '/crafting' }  ,
        { text: 'Locations', url: '/locations' }  
    ];  

    logout() {
        console.log('hey')
        this.userService.logout()
    }
}