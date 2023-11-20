import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-item-card',
  templateUrl: './individual-item-card.component.html',
  styleUrls: ['./individual-item-card.component.scss']
})
export class IndividualItemCardComponent {
    constructor
    (
        private router: Router,
        private http: HttpClient
    ) {}

    @Input() name: string = '';
    @Input() quote: string = '';
    @Input() quantity: string = '';
    @Input() imageUrl: string = ''
    userId: string = ''
    
    @Output() buttonClickEvent = new EventEmitter<any>();
    buttonClick(state: boolean) {
        console.log('hey')
        this.buttonClickEvent.emit(state)
    }
}
