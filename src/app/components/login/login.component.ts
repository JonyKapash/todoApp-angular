import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';

import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .get<any>('https://jsonplaceholder.typicode.com/users')
        .subscribe((res) => {
          const user = res.find(
            (user: any) => user.email === this.loginForm.value.email
          );
          if (user) {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Successfully logged in!',
              duration: 3000,
            });
            this.loginForm.reset();
            this.router.navigate(['todo']);
          } else {
            this.toast.error({
              detail: 'ERROR',
              summary: 'User not found',
              duration: 3000,
            });
          }
          (err: any) => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'Something went wrong',
              duration: 3000,
            });
          };
        });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.toast.error({
        detail: 'ERROR',
        summary: 'Opps! Something went wrong try again.',
        duration: 4000,
      });
    }
  }
}
