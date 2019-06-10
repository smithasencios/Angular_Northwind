import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import * as channelActions from '../../state/actions/employee.actions';
import * as fromReducer from '../../state/reducers';

@Component({
  selector: 'app-employee-create2-popup-container',
  templateUrl: './employee-create2-popup-container.component.html',
  styleUrls: ['./employee-create2-popup-container.component.scss']
})
export class EmployeeCreate2PopupContainerComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EmployeeCreate2PopupContainerComponent>,
    private store: Store<fromReducer.EmployeeState>) { }

  ngOnInit() {
  }
  onAdd(event: Employee): void {
    this.store.dispatch(new channelActions.AddEmployee(event));
    this.dialogRef.close();
  }
}
