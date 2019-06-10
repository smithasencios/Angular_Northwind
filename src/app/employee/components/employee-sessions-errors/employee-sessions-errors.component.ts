import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { CustomError } from 'src/app/shared/models/CustomError';
import { EmployeeErrorMessage } from '../../models/employee-error-messages';

@Component({
  selector: 'app-employee-sessions-errors',
  templateUrl: './employee-sessions-errors.component.html',
  styleUrls: ['./employee-sessions-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeSessionsErrorsComponent implements OnInit {
  EmployeeErrorMessage: typeof EmployeeErrorMessage = EmployeeErrorMessage;
  employeeErrorMessage: EmployeeErrorMessage;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: CustomError) {
    this.employeeErrorMessage = EmployeeErrorMessage[data.key];
  }

  ngOnInit() {
  }

}
