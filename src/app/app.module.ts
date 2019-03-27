import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BurgersComponent } from './burgers/burgers.component';
import { MessagesComponent } from './messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { fakeBackendProvider } from './services/fake-backend-interceptor.service';

//import { routing } from './app.routing';

import { JwtInterceptor } from './services/jwt-interceptor.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { BasketComponent } from './basket/basket.component';
import { AboutComponent } from './about/about.component';

//import { HomeComponent } from './home';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),

    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BurgersComponent,
    MessagesComponent,
    HeaderComponent,
    SidenavListComponent,
    LayoutComponent,
    FooterComponent,
    AlertComponent,
    RegisterComponent,
    LoginComponent,
    BasketComponent,
    AboutComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
