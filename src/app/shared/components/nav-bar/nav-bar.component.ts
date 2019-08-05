import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Menu } from '../../models/menu';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';
import { Permission } from '../../models/permission';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input()
  isAuthenticated: boolean;
  @Input()
  userProfile: any;
  @Input()
  menu: Menu[];
  @Output()
  login: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  logout: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  async onLogin() {
    await this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}


