import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { UserRestService } from '../shared/user-rest.service';
import { LoginResponse } from '../shared/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'

})

export class LoginComponent{

    @ViewChild('form', {static:true}) form:NgForm;

    constructor(private authService: AuthenticationService, private router:Router){}

    error: string = null;

    onSubmit(){
        this.authService.login(this.form.value.username, this.form.value.password).subscribe(
            (response: LoginResponse) => {
                if(!response.success){
                    this.error = response.errors.join(";");
                }
                else{
                    this.router.navigate(['/home']);
                }
            }
        );
    }

}