export class Menu {
    MenuLink: string;
    MenuOption: string;
    MenuPermissionName: string;
    MenuStyle: string;
    SubMenu: Menu[];

    static CreateInstance(menuLink: string, menuOption: string, menuPermissionName: string, menuStyle: string = "", subMenu: Menu[] = []): Menu {
        let menu: Menu = new Menu();
        menu.MenuLink = menuLink;
        menu.MenuOption = menuOption;
        menu.MenuPermissionName = menuPermissionName;
        menu.MenuStyle = menuStyle;
        menu.SubMenu = subMenu;
        return menu;
    }
}