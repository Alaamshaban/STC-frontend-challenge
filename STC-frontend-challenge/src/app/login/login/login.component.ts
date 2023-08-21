import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      userName: ['userName', Validators.required],
      password: ['Password', Validators.required]
    })
  }

  signIn(){
    console.log(this.signInForm.value)
  }

}
