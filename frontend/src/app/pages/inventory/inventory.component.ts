import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Location } from 'src/app/models/location';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import {  HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
    constructor 
    (
        private router: Router,
        private itemService: ItemService,
        private http: HttpClient,
        private userService: UserService
    ) {}

    items: Item[] = []
    locations: Location[] = []
    userId: string = '';

    loading: boolean = true
    filteredByLocations: boolean = false

    page = 1
    hasMoreItems = false
    totalItemCount = 0

    async ngOnInit() {
        await this.initializeData()
        this.hasMoreItems = this.items.length < this.totalItemCount
    }

    test(value: string) {
        console.log(value)
    }
    async initializeData() {
        const cacheItems = this.itemService.getItemsCache()
        this.userId = await this.userService.getUserId()
        this.page = this.itemService.getPageNumber()
        this.totalItemCount = this.itemService.getItemsCount()

        if (cacheItems) {
            this.items = cacheItems
            this.loading = false
            this.hasMoreItems = this.items.length < this.itemService.getItemsCount()
        } else {
            this.http.get(`http://localhost:3000/items/${this.userId}?page=${this.page}`)
                .subscribe((res: any) => {
                    this.items = res.myItems
                    this.loading = false
                    this.itemService.cacheItems(res.myItems)
                    this.totalItemCount = res.totalDocCount
                    this.itemService.setItemCount(res.totalDocCount)
                    this.hasMoreItems = this.items.length < this.totalItemCount
                }
            )
        }

        this.http.get(`http://localhost:3000/locations/${this.userId}`)
            .subscribe((res: any) => {
                this.locations = res
            }
        )
    }

    async loadMoreItems() {
        this.itemService.setPageNumber(this.page++)

        if (!this.hasMoreItems) {
            return
        }

        this.http.get(`http://localhost:3000/items/${this.userId}?page=${this.page}`)
            .subscribe((res: any) => {
                this.items = this.items.concat(res.myItems)
                this.itemService.cacheItems(this.items)
                this.totalItemCount = res.totalDocCount

                this.hasMoreItems = this.items.length < this.totalItemCount
            }
        )
    }

    clearLocationFilter(clear: boolean) {
        if (this.filteredByLocations) {
            this.filteredByLocations = !clear
            this.items = [];
            this.loading = true

            this.http.get(`http://localhost:3000/items/${this.userId}`)
                .subscribe((res: any) => {
                    this.items = res.myItems
                    this.loading = false
                    console.log(res)
                }
            )
            this.locationId = ''
            this.locationName = ''

            return;
        }
    }

    locationName: string = ''
    locationId: string = ''

    filterLocation(location: any) {
        this.locationName = location.name
        this.locationId = location.id
        this.filteredByLocations = true
        this.items = [];
        this.loading = true

        this.http.get(`http://localhost:3000/locationItems/${this.userId}/${this.locationId}`)
            .subscribe((res: any) => {
                this.items = res
                this.loading = false
            }
        )
        return;
    }

    isBeingFiltered = false

    searchItem(value: string) {
        console.log(value)
        if (value.length < 1 ) {
            console.log("HEY THERE IS NO VAlue")
            const cacheItems = this.itemService.getItemsCache()
            this.isBeingFiltered = false
            if (cacheItems) {
                this.items = cacheItems
            }
        } else if(value.length > 1) {
            this.isBeingFiltered = true
            this.locationId = ''
            this.locationName = ''
            this.http.get(`http://localhost:3000/searchItems/${this.userId}/${value}`)
                .subscribe((res: any) => {
                    this.items = res
                }
            )
        }
    }

    showModal: boolean = false;
    itemId: string = ''
    openModal(itemId: any, item: any) {
        this.showModal = true
        this.itemId = itemId
    }

    closeModal() {
        this.loading = true

        this.http.get(`http://localhost:3000/locations/${this.userId}`)
            .subscribe((res: any) => {
                this.locations = res
                this.loading = false
            }
        )

        this.http.get(`http://localhost:3000/items/${this.userId}`)
            .subscribe((res: any) => {
                this.items = res.myItems
                this.itemService.cacheItems(res.myItems)
            }
        )

        this.showModal = false
    }
}

