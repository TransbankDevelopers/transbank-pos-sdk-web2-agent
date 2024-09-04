import { Menu, shell, app, MenuItemConstructorOptions } from "electron";
import { logDirectory } from "../logger/logger";

const isMacOs = process.platform === "darwin";

const macOsMenu: MenuItemConstructorOptions = {
  label: app.name,
  submenu: [
    { role: "about", label: `Acerca de ${app.name}` },
    { type: "separator" },
    { role: "hide", label: `Ocultar ${app.name}`, accelerator: "CmdOrCtrl+H" },
    {
      role: "hideOthers",
      label: "Ocultar Otros",
      accelerator: "CmdOrCtrl+Alt+H",
    },
    { role: "unhide", label: "Mostrar Todos" },
    { type: "separator" },
    {
      role: "quit",
      label: `Salir de ${app.name}`,
      accelerator: "CmdOrCtrl+Q",
    },
  ],
};

const fileMenu: MenuItemConstructorOptions = {
  label: "Archivo",
  type: "submenu",
};

const openLogOption: MenuItemConstructorOptions = {
  label: "Abrir Carpeta de Logs",
  accelerator: "CmdOrCtrl+L",
  click: openLogFolder,
};

const exitOption: MenuItemConstructorOptions = {
  label: "Salir",
  accelerator: "CmdOrCtrl+Q",
  role: "quit",
};

const template: Electron.MenuItemConstructorOptions[] = createMenuOptions();

function createMenuOptions(): Array<MenuItemConstructorOptions> {
  const menuOptions = [];
  const fileSubMenu = [openLogOption];

  if (isMacOs) {
    menuOptions.push(macOsMenu);
  }

  if(!isMacOs) {
    fileSubMenu.push(exitOption);
  }

  fileMenu.submenu = fileSubMenu;
  menuOptions.push(fileMenu);
  return menuOptions;
}

function openLogFolder(): void {
  shell.openPath(logDirectory);
}

export function setAppMenu(): void {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
