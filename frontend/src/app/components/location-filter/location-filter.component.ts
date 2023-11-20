import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent {
    @Input() locations: any;

    ngOnInit() {
        console.log(this.locations)
    }

    clearFilter: string = 'Clear'
    @Output() clearFilterEvent = new EventEmitter<boolean>();
    clearLocationFilter(clear: boolean) {
        this.locations.map((x: { active: boolean; }, idx: number) => {
            x.active = false
        })
        this.clearFilterEvent.emit(clear)
    }

    @Output() locationFilterEvent = new EventEmitter<object>();

    filterLocation(location: string, index: number, locationId: string) {
        this.locations.map((x: { active: boolean; }, idx: number) => {
            x.active = false
            if(idx == index) {
                x.active = !x.active
            } 
        })

        let details = {
            name: location,
            id: locationId
        }
        this.locationFilterEvent.emit(details)
    }
}
