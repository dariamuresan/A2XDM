import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { UserRestService } from '../shared/user-rest.service';
import { LoginResponse } from '../shared/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    });

    constructor(private authenticationService: AuthenticationService,
        private router: Router) {}

    ngOnInit(): void {
    }

    onLogin() {
        this.authenticationService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe(
            {
                next: () => {
                        this.router.navigate(['home']);
                },

                error: () => {
                    alert("Ups :( Username or password not correct!");
                    this.loginForm.reset;
                }
            }
        )
    }
    
}