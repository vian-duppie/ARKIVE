import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-add-location-modal',
    templateUrl: './add-location-modal.component.html',
    styleUrls: ['./add-location-modal.component.scss']
})

export class AddLocationModalComponent {
    constructor
        (
            private itemService: ItemService,
            private http: HttpClient,
            private userService: UserService
        ) { }
    @Input() userId: string;
    @Input() locations: any;

    selectedColor: string = 'aliceblue'
    @Input() colors: Array<string> = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];

    @Output() closeModalEvent = new EventEmitter<boolean>();
    closeModal() {
        this.closeModalEvent.emit(false)
    }

    busy = false

    locationName: string;
    locationLong: string;
    locationLat: string;

    addNewLocation() {
        if (this.busy) return

        if (parseInt(this.locationLat) > 100) {
            this.locationLat = '100'
        }

        if (parseInt(this.locationLong) > 100) {
            this.locationLong = '100'
        }

        
        let data = {
            id: this.userId,
            name: this.locationName,
            longitude: this.locationLong,
            latitude: this.locationLat,
            color: this.selectedColor
        }
        console.log(data)

        this.busy = true

        this.http.patch(`http://localhost:3000/locationAdd`, data)
            .subscribe((res: any) => {
                this.busy = true
                if(res.status) {     
                    this.locations = res.locations
                    this.closeModal()
                }
                this.busy = false
            }
        )
    }

    defaultOption: string;
    selectedOption: string;

    page = 1
    limit = 20

    ngOnInit() {
        this.limit = 20 * this.itemService.getPageNumber()
        if (this.locations?.length > 0) {
            this.selectedOption = this.locations![0].name
            this.defaultOption = this.locations![0].name;
        }
    }



    deleteLocation() {
        let data = {
            id: this.userId,
            locationId: this.selectedOption
        }

        if (this.selectedOption == 'Base') {
            return;
        }

        this.http.patch(`http://localhost:3000/locationDelete`, data)
            .subscribe((res: any) => {
                if(res.status) {     
                    this.locations = res.locations
                    if(this.locations.length > 0) {
                        this.selectedOption = this.locations[0].name
                        this.defaultOption = this.locations[0].name;
                    }     
                    
                    this.http.get(`http://localhost:3000/items/${this.userId}?page=${this.page}`)
                        .subscribe((res: any) => {
                            this.itemService.cacheItems(res.myItems)
                        }
                    )
                    
                }
            }
        )
        // this.closeModal()
    }
}