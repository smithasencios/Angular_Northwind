import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/services/authentication.service';
import { AuthorizationService } from './auth/services/authorization.service';
import { Menu } from './shared/models/menu';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Permission } from './shared/models/permission';
import * as fromReducer from './state/reducers/index';
import { Store } from '@ngrx/store';
import * as storageActions from './state/actions/storage.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  profile: any;
  menu: Menu[] = [];

  private auth0Client: Auth0Client;

  constructor(private authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private store: Store<fromReducer.State>) {

  }

  async ngOnInit() {
    this.auth0Client = await this.authService.getAuth0Client();
    // Watch for changes to the isAuthenticated state
    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });
    // Watch for changes to the profile data
    this.authService.profile.subscribe(profile => {
      this.profile = profile;

      if (profile) {
        this.authorizationService.getPermissionsByUserId(profile.sub)
          .subscribe((response: any) => {
            this.store.dispatch(new storageActions.UpdateStorage("permissions",response.data));
            this.setMenuOptions(response.data);
          })
      }
    });
  }

  async login() {
    await this.auth0Client.loginWithRedirect({ redirect_uri: `${window.location.origin}/callback` });
  }

  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }

  setMenuOptions(permissions: Permission[]): void {
    if (!permissions) {
      this.menu = [];
    }

    this.menu = this.verifyPermissions(this.getMenu(), permissions);
  }

  getMenu(): Menu[] {
    let options: Menu[] = [
      Menu.CreateInstance("/employee", "Empleados", "read:empleados"),
      Menu.CreateInstance("/product", "Productos", "read:productos"),
      Menu.CreateInstance("/order", "Ventas", "read:orders", "dropdown",
        [
          Menu.CreateInstance("/order", "Ordenes", "read:orders"),
          Menu.CreateInstance("/order/manage", "Nueva Orden", "add:orders")
        ]),
    ];
    return options;
  }

  verifyPermissions(menuOptions: Menu[], permissions: Permission[]): Menu[] {
    if (menuOptions.length === 0) {
      return []
    }
    return menuOptions.filter((menuOption: Menu) => {
      const hasPermissions = permissions.some((permission: Permission) => {
        return menuOption.MenuPermissionName === permission.permission_name;
      });
      menuOption.SubMenu = this.verifyPermissions(menuOption.SubMenu, permissions);
      return hasPermissions;
    });

  }
}
