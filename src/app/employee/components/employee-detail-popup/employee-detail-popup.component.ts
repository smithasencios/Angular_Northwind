import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employee-detail-popup',
  templateUrl: './employee-detail-popup.component.html',
  styleUrls: ['./employee-detail-popup.component.scss']
})
export class EmployeeDetailPopupComponent implements OnInit {

  @Input()
  employee: Employee;

  constructor() { }

  ngOnInit() {
  }

}
