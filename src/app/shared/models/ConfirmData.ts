export class ConfirmData {
  title?: string;
  message?: string;
  showcancel?: boolean;
  constructor(title: string, message: string, showCancel = false) {
    this.title = title;
    this.message = message;
    this.showcancel = showCancel;
  }
}
