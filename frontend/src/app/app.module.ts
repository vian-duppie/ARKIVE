import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { CraftingComponent } from './pages/crafting/crafting.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationFilterComponent } from './components/location-filter/location-filter.component';
import { FilterComponent } from './components/filter/filter.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { IndividualItemCardComponent } from './components/individual-item-card/individual-item-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { AddLocationModalComponent } from './components/add-location-modal/add-location-modal.component';
import { LocationLegendComponent } from './components/location-legend/location-legend.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AboutComponent,
    InputComponent,
    ButtonComponent,
    NavbarComponent,
    InventoryComponent,
    CraftingComponent,
    LocationsComponent,
    LocationFilterComponent,
    FilterComponent,
    RadioButtonComponent,
    CheckboxComponent,
    IndividualItemCardComponent,
    SearchBarComponent,
    ItemModalComponent,
    LoginComponent,
    AddLocationModalComponent,
    LocationLegendComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }