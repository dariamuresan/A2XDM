import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { InlineMovieListComponent } from './home/inline-movie-list/inline-movie-list.component';
import { MovieItemComponent } from './shared/movie-item/movie-item.component';
import { LoginComponent } from './login/login.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { FiltersComponent } from './movies/filters/filters.component';
import { FilterListComponent } from './movies/filters/filter-list/filter-list.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReviewsComponent } from './movie-details/reviews/reviews.component';
import { StarsComponent } from './movie-details/reviews/stars/stars.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MoviesComponent,
    InlineMovieListComponent,
    MovieItemComponent,
    LoginComponent,
    MoviesListComponent,
    FiltersComponent,
    FilterListComponent,
    MovieDetailsComponent,
    ReviewsComponent,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
