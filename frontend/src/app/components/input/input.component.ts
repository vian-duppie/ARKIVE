import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Props } from './input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() props: Props;

    inputState: string = 'blur';
    
    /* ../../../assets/icons/ic_warning.svg */

    @Output() valueChange = new EventEmitter<string>();
  
    onInputChange(value: string) {
      this.valueChange.emit(value);
    }

    onFocus(){
        this.inputState = 'focused'
    }

    onBlur() {
        this.inputState = 'blur'
    }

    ngOnInit() {
        if(this.props.message != '') {
            this.props.error = 'error'
        }
    }

    showPassword: boolean = false

    changePasswordVisibility() {
        this.showPassword = !this.showPassword
    }
}
