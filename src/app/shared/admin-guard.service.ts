import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {exhaustMap, map, take} from 'rxjs/operators';
import { IUser } from '../user-profile/user.model';
import { AuthenticationService } from './authentication.service';
import { UserRestService } from './user-rest.service';

@Injectable({providedIn:'root'})
export class AdminGuardService implements CanActivate{
    
    constructor(private userRestService:UserRestService, private authService:AuthenticationService){}
    
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        
        let user = this.authService.getCurrentLoggedUser();
        
        return this.userRestService.getUserInfo(user).pipe(
            map((user: IUser) => {
                return user.role === 'admin';
            })
        );
    }
}