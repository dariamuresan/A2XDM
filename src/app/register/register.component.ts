import {Component} from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent{
    user = {
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmpassword: null,
        userRole: 'user',
    }
}