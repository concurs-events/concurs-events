import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@pages/home/home.component';
import { HeaderComponent } from '@components/header/header.component';
import { HeroBannerComponent } from '@components/hero-banner/hero-banner.component';
import { ServiceComponent } from '@components/service/service.component';
import { CompletedEventsComponent } from '@components/completed-events/completed-events.component';
import { GalleryComponent } from '@components/gallery/gallery.component';
import { CardsComponent } from '@components/cards/cards.component';
import { ContactUsComponent } from '@components/contact-us/contact-us.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ContentfulService } from '@app/service/contentful/contentful.service';
import { Util } from '@app/common/util';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ContactComponent } from './pages/contact/contact.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LocationComponent } from './components/location/location.component';
import { EventsListingComponent } from './pages/events-listing/events-listing.component';
import { OurServiceComponent } from './pages/our-service/our-service.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeroBannerComponent,
    ServiceComponent,
    CompletedEventsComponent,
    GalleryComponent,
    CardsComponent,
    ContactUsComponent,
    FooterComponent,
    ContactComponent,
    BreadcrumbComponent,
    LocationComponent,
    EventsListingComponent,
    OurServiceComponent,
    AboutUsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LightboxModule,
  ],
  providers: [ContentfulService,
    Util],
  bootstrap: [AppComponent]
})
export class AppModule { }
