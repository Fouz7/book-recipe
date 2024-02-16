import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_service'

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

    if (this.route.snapshot.queryParams.registered) {
      this.success = 'login successful';
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
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
