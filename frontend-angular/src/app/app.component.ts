import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message = "Record Successfully Saved";


  validationForm: any;

  constructor(private httpService: HttpClient,private formBuilder: FormBuilder) {
    this.validationForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required,Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    });

  }


  get userName() {
    return this.validationForm.get('username');
  }

  get phoneNumber() {
    return this.validationForm.get('phoneNumber');
  }

  get password() {
    return this.validationForm.get('password');
  }

  get email() {
    return this.validationForm.get('email');
  }


  errors(data:any) {
    console.log(JSON.stringify(data));
  }

  saveUserData() {
    this.httpService.post('https://leeway-bcknd.herokuapp.com/user/register', {
      name: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value,
    }).subscribe((result:any) => {
        alert(result.message);
    });
  }
}
