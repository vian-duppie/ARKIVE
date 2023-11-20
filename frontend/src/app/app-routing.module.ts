import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CraftingComponent } from './pages/crafting/crafting.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: AboutComponent},
    {path: 'inventory', component: InventoryComponent},
    {path: 'crafting', component: CraftingComponent},
    {path: 'locations', component: LocationsComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
