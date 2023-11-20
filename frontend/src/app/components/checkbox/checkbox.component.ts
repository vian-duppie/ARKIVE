import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    checkIcon: string = '../../../assets/icons/ic_check.svg';

    @Input() options: { value: string, active: boolean }[] = [
        { value: 'In Stock', active: false },    
        { value: 'Out of Stock', active: false }
    ];

    @Output() filter = new EventEmitter<string>();

    changeFilterState(option: string, index: number) {
        this.options.map((x, idx) => {
            if(idx == index) {
                x.active = !x.active
            }
        })
        this.filter.emit(option);
    }
}
