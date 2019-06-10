import { Component, OnInit, Input } from '@angular/core';
import { BestEmployee } from '../../models/BestEmployee';

@Component({
  selector: 'app-employee-best',
  templateUrl: './employee-best.component.html',
  styleUrls: ['./employee-best.component.scss']
})
export class EmployeeBestComponent implements OnInit {

  @Input()
  employee: BestEmployee;

  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

}
