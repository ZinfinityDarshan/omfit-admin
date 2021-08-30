import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      'username':[null, Validators.required],
      'password':[null, Validators.required]
    })
   }

  
  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.controls['username'].value);
    
    this.auth.verifyLogin(this.loginForm.controls['username'].value,
    this.loginForm.controls['password'].value).subscribe(u =>{
      console.log(u);
      if(u){
        this.snackBar.open('Logged in successfully', 'close', {duration: 2000})
      }else{
        this.snackBar.open('user credentials are wrong', 'close', {duration: 2000})
      }
    })
  }

  formReset(){
    this.loginForm.reset();
    if(this.loginForm!=null){
      for(const key in this.loginForm.controls){
        if(key === undefined || key === null || key === '' || key.length === 0){
  
        }else{
          this.loginForm.get(key).clearValidators();
          this.loginForm.get(key).clearAsyncValidators();
          this.loginForm.get(key).updateValueAndValidity();
        }
      }
    }
  }
}
