import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }

    userId: string
    items: Item[] = []
    locations: Location[] = []

    private itemsCache: Item[] | null = null
    private pageNumber: number = 1
    private itemCount: number = 0

    cacheItems(items: Item[]) {
        this.itemsCache = items
    }

    getItemsCache(): Item[] | null {
        return this.itemsCache
    }

    getPageNumber() {
        return this.pageNumber 
    }

    setPageNumber(page: number) {
        this.pageNumber = page
    }

    getItemsCount() {
        return this.itemCount
    }

    setItemCount(count: number) {
        this.itemCount = count
    }
}