import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { IUser } from '../user-profile/user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
    user: IUser = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        profilePicture: "",
        password: "",
        passwordConfirmation: "",
        role: "",
        isNotified : false
    }

    registerForm = new FormGroup({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        username: new FormControl(this.user.username, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        passwordGroup: new FormGroup({
            password: new FormControl(this.user.password, [Validators.required]),
            passwordConfirmation: new FormControl(this.user.passwordConfirmation, [Validators.required])
        })
    });

    constructor(private authService : AuthenticationService,
        private router: Router) {}

    ngOnInit(): void {
        
    }

    onRegister() {
        this.authService.register(this.user).subscribe(
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
