import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { UserResponse } from '../shared/user.model';
import { IUser } from '../user-profile/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
    registerForm = new FormGroup({
        firstName: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        passwordGroup: new FormGroup({
            password: new FormControl("", [Validators.required]),
            passwordConfirmation: new FormControl("", [Validators.required])
        })
    });

    constructor(private authService : AuthenticationService,
        private router: Router) {}

    ngOnInit(): void {
    }

    onRegister() {
        let userResponse: UserResponse = {
            username: this.registerForm.value['username'],
            firstname: this.registerForm.value['firstName'],
            lastname: this.registerForm.value['lastName'],
            email: this.registerForm.value['email'],
            password: this.registerForm.value['passwordGroup']['password'], 
            passwordConfirmation: this.registerForm.value['passwordGroup']['passwordConfirmation'],
            role: "user",
            image: "https://images.pexels.com/photos/1013335/pexels-photo-1013335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            newsletter : false
        }

        console.log(userResponse);

        this.authService.register(userResponse).subscribe(
            response => {
                if(response.success)
                    this.router.navigate(['home']);
                else {
                    alert(response.errors.join(","));
                    this.registerForm.reset;
                }
            }
        )
    }
    

}
