import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { UserCurrentSession } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authenticationService:AuthenticationService){}

    intercept(request:HttpRequest<any>, next:HttpHandler){
        return this.authenticationService.userSubject.pipe(
                take(1), 
                exhaustMap((user:UserCurrentSession) => {
                    if(!user){
                        return next.handle(request);
                    }
                    const modifiedRequest = request.clone({
                        params:new HttpParams().set('AuthorizationToken', user.token)
                    });
                        
                    return next.handle(modifiedRequest);
                })
        );
    }
}