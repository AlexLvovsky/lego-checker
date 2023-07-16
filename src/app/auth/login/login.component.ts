import { Component, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    @Optional() private auth: Auth,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .emailSignIn(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .then(userCredential => {
        // Signed in
        // const user = userCredential.user;
        this.loading = false;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async loginWithGoogle() {
    await this.authService.googleLogin();
    await this.router.navigateByUrl('/');
  }
}
