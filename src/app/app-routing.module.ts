import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import {LoginComponent} from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path : '', redirectTo : '/home', pathMatch: 'full'},
  { path : 'home', component : HomeComponent},
  { path : 'movies', component : MoviesComponent},
  { path : 'login', component : LoginComponent},
  { path : "favourites", component : FavouritesComponent},
  { path : 'movie-details/:id', component : MovieDetailsComponent},
  { path : "search-result/:searchKey", component : SearchResultComponent},
  { path : "profile", component : UserProfileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
