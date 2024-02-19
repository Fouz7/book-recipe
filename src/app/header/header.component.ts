import { Component} from '@angular/core';
import { AccountService } from '@app/_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private accountService: AccountService,
  ) {}

  sidebarVisible2: boolean = false;

  logout() {
    this.accountService.logout();
  }
}
