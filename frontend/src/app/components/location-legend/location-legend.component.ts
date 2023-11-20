import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-location-legend',
  templateUrl: './location-legend.component.html',
  styleUrls: ['./location-legend.component.scss']
})

export class LocationLegendComponent {
    @Input() locations: Array<any>;
}