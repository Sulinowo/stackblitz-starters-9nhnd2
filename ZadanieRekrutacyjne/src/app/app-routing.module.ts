import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PromotionsComponent } from './components/promotions/promotions.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'promotions', component: PromotionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
