import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { tap } from 'rxjs';

import { MyDataService } from '../../services/my-data.service';
import ValidateForm from '../helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usersData: any;
  usersData$: any;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private myDataService: MyDataService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.usersData$ = this.myDataService
      .getData()
      .pipe(tap((data) => (this.usersData = data)));
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
            // alert('User is found');
            this.toast.success({detail: "SUCCESS", summary: "Successfully logged in!", duration: 3000});
            this.loginForm.reset();
            this.router.navigate(['todo']);
          } else {
            this.toast.error({detail: "ERROR", summary: "User not found", duration: 3000});
          }
          (err: any) => {
            this.toast.error({detail: "ERROR", summary: "Something went wrong", duration: 3000});
          };
        });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid please check again');
    }
  }
}
