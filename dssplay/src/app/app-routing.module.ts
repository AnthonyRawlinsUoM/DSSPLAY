import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MappingComponent } from './mapping/mapping.component';
import { ChartingComponent } from './charting/charting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path:'welcome', component: WelcomeComponent, data: {state: 'welcome'}},
  { path:'mapping', component: MappingComponent, data: {state: 'welcome'}},
  { path:'charting', component: ChartingComponent, data: {state: 'welcome'}},

  { path:'', component: WelcomeComponent, data: {state: 'welcome'}},
  { path: '**', component: PageNotFoundComponent, data: { state: '404' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
