import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { UserResponse } from 'src/app/shared/user.model';
import { IUser } from '../user.model';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {
  username: string;
  user: IUser = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    profilePicture: "",
    isNotified : false,
    password: null,
    passwordConfirmation: null,
    role: null
  };

  userInfoForm: FormGroup;

  constructor(private cd: ChangeDetectorRef,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];

    this.authService.getUserByUsername(this.username).subscribe( response => {
      this.user.username = response.username;
      this.user.firstName = response.firstname;
      this.user.lastName = response.lastname;
      this.user.email = response.email;
      this.user.profilePicture = response.image;
      this.user.role = response.role;
      this.user.isNotified = response.newsletter;
      this.user.password = response.password;
      this.user.passwordConfirmation = response.passwordConfirmation;
      this.user.role = response.username;
      
      this.userInfoForm = new FormGroup({
        file: new FormControl(null),
        'firstName': new FormControl(this.user.firstName, Validators.required),
        'lastName': new FormControl(this.user.lastName, Validators.required),
        'email': new FormControl(this.user.email, Validators.required),
        'notification': new FormControl(this.user.isNotified)
      });
    });
  }

  onSubmit() {
    let userResponse: UserResponse = {
      username: this.user.username,
            firstname: this.userInfoForm.value['firstName'],
            lastname: this.userInfoForm.value['lastName'],
            email: this.userInfoForm.value['email'],
            password: this.user.password, 
            passwordConfirmation: this.user.passwordConfirmation,
            role: this.user.role,
            image: this.userInfoForm.value['file'] == null ? this.user.profilePicture : this.userInfoForm.value['file'],
            newsletter : this.userInfoForm.value['notification']
    }
    
    this.authService.editUser(userResponse).subscribe();

    this.router.navigate(['profile', this.username]);
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.userInfoForm.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}
