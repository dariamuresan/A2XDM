import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ReviewsComponent } from './movie-details/reviews/reviews.component';
import { StarsComponent } from './movie-details/reviews/stars/stars.component';
import { DatePipe } from '@angular/common';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { RepliesComponent } from './movie-details/reviews/replies/replies.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditProfileComponent } from './user-profile/user-edit-profile/user-edit-profile.component';
import { SortSelectorComponent } from './movies/sort-selector/sort-selector.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { RegisterComponent } from './register/register.component';

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
    StarsComponent,
    FavouritesComponent,
    SearchResultComponent,
    RepliesComponent,
    UserProfileComponent,
    UserEditProfileComponent,
    SortSelectorComponent,
    AdminConsoleComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
