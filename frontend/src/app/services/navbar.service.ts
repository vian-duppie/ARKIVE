import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
	visible: boolean = false;

    // Hides Navbar
	hide() { 
        this.visible = false; 
    }

    // Shows Navbar
	show() { 
        this.visible = true; 
    }
}