import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
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
                        headers:new HttpHeaders().set('authorization', user.token)
                    });
                        
                    return next.handle(modifiedRequest);
                })
        );
    }
}