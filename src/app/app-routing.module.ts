import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '@app/pages/about-us/about-us.component';
import { ContactComponent } from '@app/pages/contact/contact.component';
import { EventsListingComponent } from '@app/pages/events-listing/events-listing.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { OurServiceComponent } from '@app/pages/our-service/our-service.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'events', component: EventsListingComponent },
  { path: 'our-service', component: OurServiceComponent },
  { path: 'about-us', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
