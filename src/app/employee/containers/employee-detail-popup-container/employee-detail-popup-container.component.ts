import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as channelActions from '../../state/actions/employee.actions';
import * as fromReducer from '../../state/reducers';
import { Observable } from 'rxjs';
import { Employee } from '../../models/Employee';

interface DialogData {
  employeeId: number;
}
@Component({
  selector: 'app-employee-detail-popup-container',
  templateUrl: './employee-detail-popup-container.component.html',
  styleUrls: ['./employee-detail-popup-container.component.scss']
})
export class EmployeeDetailPopupContainerComponent implements OnInit {

  employee$: Observable<Employee> = this.store.select(fromReducer.getEmployee);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store<fromReducer.EmployeeState>) {
    this.store.dispatch(new channelActions.LoadEmployeeById(data.employeeId));
  }

  ngOnInit() {
  }

}
