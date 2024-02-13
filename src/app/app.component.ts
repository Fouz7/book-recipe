import { Component } from '@angular/core';
import { Router, NavigationError } from '@angular/router';

import { AccountService } from './_service';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-recipe-fe-angular';
  user?: User | null;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {});
  }
}