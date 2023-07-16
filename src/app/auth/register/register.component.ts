import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    @Optional() private auth: Auth,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.controls['email'].value);

    this.loading = true;
    createUserWithEmailAndPassword(
      this.auth,
      this.form.controls['email'].value,
      this.form.controls['password'].value
    )
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        updateProfile(userCredential.user, {
          displayName: this.form.controls['firstName'].value,
        })
          .then(result => {
              console.log(result);
              this.loading = false;
          })
          .catch(error => {
            console.log(error);
          });
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}
