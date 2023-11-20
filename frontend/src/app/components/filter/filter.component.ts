import { Component, ViewChild } from '@angular/core';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    @ViewChild(RadioButtonComponent) child: RadioButtonComponent;
    clearFilters() {
        // TODO: Clear the filter when this functions runs
        this.child.test();
    }
}
