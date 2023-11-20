import { Component } from '@angular/core';
import { NavbarService } from './services/navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NavbarService]
})
export class AppComponent {
    title = 'ARKIVE';

    showNavbar = true;
    currentRoute: string | undefined ;

    constructor(private router: Router, public nav: NavbarService) {}
    
    // On Initialisation
    ngOnInit() {
        console.log('hey')
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.currentRoute = this.router.url;
            if(this.currentRoute == '/register' || this.currentRoute == '/login') {
                this.nav.hide();
            } else {
                this.nav.show();
            }
        });
    }
}