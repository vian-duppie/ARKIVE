import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent {
    constructor
    (
        private http: HttpClient
    ) {}
    @Input() itemId: string;
    @Input() userId: string;
    @Input() locations: any;

    @Output() closeModalEvent = new EventEmitter<boolean>();
    closeModal() {
        this.closeModalEvent.emit(false)
    }

    item: Item = {
        _id: {
            $oid: ''
        },
        name: '',
        image_url: '',
        quote: '',
        rarity: '',
        user_inventory: [],
        category: [],
        weight: undefined,
        required_level: 0,
        crafting_time: '',
        crafted_in: [],
        ingredients: []
    }

    defaultOption: string;
    selectedOption: string;
  
    quantityToAdd: number;

    getQuantityById(arr: Array<any>, id: string) {
        const matchingObj = arr.find(obj => obj._id === id);
        if (matchingObj) {
          return matchingObj.quantity;
        }
        return null; // or throw an error if you prefer
    }

    maxQuantityRemove: number;

    onSubmit(itemId: any) {
        this.maxQuantityRemove = this.getQuantityById(this.item.user_inventory[0].locations, this.selectedOption)
        if (this.quantityToAdd < -this.maxQuantityRemove) {
            this.quantityToAdd = -this.maxQuantityRemove
        }

        if (this.maxQuantityRemove == 0 && this.quantityToAdd < 1) {
            console.log('stopping')
            return;
        }

        if(this.quantityToAdd == undefined) {
            this.quantityToAdd = 0
        }

        console.log(this.quantityToAdd)
        this.http.get(`http://localhost:3000/updateQuantityByLocation/${this.userId}/${this.itemId}/${this.selectedOption}/${this.quantityToAdd}`)
        .subscribe((res: any) => {
            this.item = res
        })
    }

    ngOnInit() {
        this.http.get(`http://localhost:3000/singleItem/${this.userId}/${this.itemId}`)
            .subscribe((res: any) => {
                this.item = res
            }
        )
        this.selectedOption = this.locations[0].name
        this.defaultOption = this.locations[0].name;
    }
}