import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate{
    
    constructor(private authService:AuthenticationService, private router:Router){}
    
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.authService.userSubject.pipe(
            take(1),
            map((user) => {
                const isAuthenticated = !!user;
                if(isAuthenticated){
                    return true;
                }
                return this.router.createUrlTree(['/login']);
            })
        )
    }
}