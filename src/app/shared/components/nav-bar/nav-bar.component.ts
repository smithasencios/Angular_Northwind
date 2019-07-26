import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Permission, NavBarService } from './nav-bar.service';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthenticated = false;
  profile: any;
  menu: Menu[] = [];

  private auth0Client: Auth0Client;

  constructor(private authService: AuthService, private navBarService: NavBarService) { }

  async ngOnInit() {
    // Get an instance of the Auth0 client
    this.auth0Client = await this.authService.getAuth0Client();
    // Watch for changes to the isAuthenticated state
    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });

    // Watch for changes to the profile data
    this.authService.profile.subscribe(profile => {
      this.profile = profile;

      if (profile) {
        this.navBarService.getPermissionsByUserId(profile.sub)
          .subscribe((response: any) => {
            this.setMenuOptions(response.data);

          })
      }
    });

  }

  async login() {
    await this.auth0Client.loginWithRedirect({ redirect_uri: `${window.location.origin}/callback` });
  }

  /**
   * Logs the user out of the applicaion, as well as on Auth0
   */
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


