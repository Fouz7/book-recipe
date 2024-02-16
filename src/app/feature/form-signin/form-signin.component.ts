import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/core/services'

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrl: './form-signin.component.css'
})
export class FormSigninComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // show success message after registration
    if (this.route.snapshot.queryParams.registered) {
      this.success = 'login successful';
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.error = '';
    this.success = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    // console.log(this.f.username.value);
    // console.log(this.f.password.value);

    this.accountService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/daftar-resep');
      },
      error: error => {
        this.error = "Username / Password Salah";
        this.loading = false;
      }
    });
  }
}
