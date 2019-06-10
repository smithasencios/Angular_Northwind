import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../../models/Employee';
import { validatePhone } from 'src/app/shared/validators/phone.validator';

@Component({
  selector: 'app-employee-create2-popup',
  templateUrl: './employee-create2-popup.component.html',
  styleUrls: ['./employee-create2-popup.component.scss']
})
export class EmployeeCreate2PopupComponent implements OnInit {

  @Output()
  add: EventEmitter<Employee> = new EventEmitter<Employee>();

  newForm: FormGroup;
  employee: Employee;

  constructor(private fb: FormBuilder) {
    this.buildNewForm();
  }

  ngOnInit() {
  }

  buildNewForm(): void {
    this.newForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      company: ['', []],
      address: ['', [Validators.required]],
      business_phone: ['', [validatePhone]],
      email_address: ['', [Validators.required, Validators.email]],
      fax_number: ['', []],
      home_phone: ['', []],
      job_title: ['', []],
      mobile_phone: ['', [validatePhone]]
    });
  }

  onCreate(): void {
    if (this.newForm.valid) {
      if (this.newForm.dirty) {
        const newEmployee = { ...this.employee, ...this.newForm.value };

        this.add.emit(newEmployee);

      } else {
        console.log('no se actualizo nada.')
      }

    }
  }
}

