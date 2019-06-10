import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AppConfirmComponent } from './app-confirm.component';
import { ConfirmData } from '../../models/ConfirmData';

@Injectable({
  providedIn: 'root'
})
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    const dialogRef = this.dialog.open(AppConfirmComponent, {
      width: '380px',
      disableClose: true,
      data
    });
    return dialogRef.afterClosed();
  }
}
