import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
    @Output() valueChange = new EventEmitter<string>();
    inputValue: string = '';
  
    onInputChange() {
        console.log(this.inputValue)
        this.valueChange.emit(this.inputValue)
        this.searchItem(this.inputValue)
    }

    @Output() searchEvent = new EventEmitter<string>();
    searchItem(value: string) {
        // if (value.length > 0) {
            console.log(value)
            this.searchEvent.emit(value)
        // }
    }
}
