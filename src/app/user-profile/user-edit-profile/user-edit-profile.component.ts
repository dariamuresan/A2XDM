import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../user.model';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {

  user: IUser = {
    username: 'dariamuresan',
    firstName: 'Daria',
    lastName: 'Muresan',
    email: 'md@yahoo.com',
    profilePicture: 'not-yet'
  };

  userInfoForm: FormGroup;

  constructor(private cd: ChangeDetectorRef,
    private router : Router) { }

  ngOnInit(): void {
    this.userInfoForm = new FormGroup({
      file: new FormControl(null),
      'firstName': new FormControl(this.user.firstName, Validators.required),
      'lastName': new FormControl(this.user.lastName, Validators.required),
      'email': new FormControl(this.user.email, Validators.required)
    })
  }

  onSubmit() {
    console.log(this.userInfoForm);
    this.router.navigate(['profile']);
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
