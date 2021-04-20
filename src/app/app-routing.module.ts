import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import {LoginComponent} from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  { path : '', redirectTo : '/home', pathMatch: 'full'},
  { path : 'home', component : HomeComponent},
  { path : 'movies', component : MoviesComponent},
  { path : 'login', component : LoginComponent},
  { path : 'movie-details/:id', component : MovieDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
