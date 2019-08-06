import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/services/authentication.service';
import { AuthorizationService } from './auth/services/authorization.service';
import { Menu } from './shared/models/menu';
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

  menu: Menu[] = [];

  constructor(public authService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private store: Store<fromReducer.State>) { }

  ngOnInit() {
    this.authService.localAuthSetup();
    this.authService.userProfile$
      .subscribe((userProfile: any) => {
        if (userProfile) {
          this.authorizationService.getPermissionsByUserId(userProfile.sub)
            .subscribe((response: any) => {
              this.store.dispatch(new storageActions.UpdateStorage("permissions", response.data));
              this.setMenuOptions(response.data);
            })
        }
      });

  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
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
