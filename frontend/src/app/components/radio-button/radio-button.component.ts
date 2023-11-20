import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
    @Input() options: { value: string, active: boolean }[] = [    
        { value: 'In Stock', active: false },    
        { value: 'Out of Stock', active: false }
    ];

    @Output() locationFilterEvent = new EventEmitter<string>();

    filter(option: string, index: number) {
        this.options.map((x, idx) => {
            x.active = false
            if(idx == index) {
                x.active = !x.active
            } 
        })
        console.log(option)
        this.locationFilterEvent.emit(option)
    }

    test() {
        // TODO: Clear radio buttons
        console.log('hey this functions runs from the parent component')
    }
}
