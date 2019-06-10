import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as channelActions from '../../state/actions/employee.actions';
import * as fromReducer from '../../state/reducers';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee';

interface DialogData {
  employeeId: number;
}

@Component({
  selector: 'app-employee-create-popup-container',
  templateUrl: './employee-create-popup-container.component.html',
  styleUrls: ['./employee-create-popup-container.component.scss']
})
export class EmployeeCreatePopupContainerComponent implements OnInit {

  employee$: Observable<Employee> = this.store.select(fromReducer.getEmployee);

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData, private store: Store<fromReducer.EmployeeState>,
  private dialogRef: MatDialogRef<EmployeeCreatePopupContainerComponent>) {
    this.store.dispatch(new channelActions.LoadEmployeeById(data.employeeId));
  }

  ngOnInit() {
  }
  onUpdate(newEmployee: Employee): void {
    this.store.dispatch(new channelActions.UpdateEmployee(newEmployee));
    this.dialogRef.close();
  }
}
