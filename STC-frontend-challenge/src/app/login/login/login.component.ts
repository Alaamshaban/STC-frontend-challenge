import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Roles } from '../../shared/enums/roles.enum'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      userName: ['user', Validators.required],
      password: ['user', Validators.required]
    })
  }

  signIn() {
    if (this.signInForm.valid) {
      const role = this.signInForm.value.userName === 'user' && this.signInForm.value.password === 'user' ? Roles.user :
        this.signInForm.value.userName === 'admin' && this.signInForm.value.password === 'admin' ? Roles.admin : ''
      this.authService.login(role)
      if (role === Roles.user)
        this.router.navigate(['user'])
      else
        this.router.navigate(['admin'])
    }
    else
      this.signInForm.markAllAsTouched();
  }

}
