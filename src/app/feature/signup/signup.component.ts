import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/core/services';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  showPassword = false;
  passwordInputType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .signup(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([''], {
            queryParams: { registered: true },
          });
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

}
