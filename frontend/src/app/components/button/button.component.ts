import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() type: string = 'tertiary';
    @Input() size: string = 'medium';
    @Input() placeholder: string = 'Placeholder';
    @Output() Click = new EventEmitter<any>();

    onClick(e: any) {
        this.Click.emit(e)
    }


    // This will be nothing
}
