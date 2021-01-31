import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailsComponent } from '@pages/event-details/event-details.component';
import { CounterComponent } from '@app/components/counter/counter.component';
import { EvtDescComponent } from '@app/components/evt-desc/evt-desc.component';
import { PeopleComponent } from '@app/components/people/people.component';
import { PricingComponent } from '@app/components/pricing/pricing.component';
import { SponsersComponent } from '@app/components/sponsers/sponsers.component';

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
    EventDetailsComponent,
    CounterComponent,
    EvtDescComponent,
    PeopleComponent,
    PricingComponent,
    SponsersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LightboxModule,
    LazyLoadImageModule,
    BrowserAnimationsModule,
  ],
  providers: [ContentfulService,
    Util,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
