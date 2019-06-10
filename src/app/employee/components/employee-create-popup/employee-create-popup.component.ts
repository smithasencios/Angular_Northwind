import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/Employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validatePhone } from 'src/app/shared/validators/phone.validator';

@Component({
  selector: 'app-employee-create-popup',
  templateUrl: './employee-create-popup.component.html',
  styleUrls: ['./employee-create-popup.component.scss']
})
export class EmployeeCreatePopupComponent implements OnInit, OnChanges {

  @Input()
  employee: Employee;
  @Output()
  update: EventEmitter<Employee> = new EventEmitter<Employee>();

  editForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.employee && changes.employee.currentValue) {
      this.buildEditForm();
    }
  }
  ngOnInit() {
  }
  buildEditForm() {

    this.editForm = this.fb.group({
      id: [this.employee.id, [Validators.required]],
      first_name: [this.employee.first_name, [Validators.required]],
      last_name: [this.employee.last_name, [Validators.required]],
      company: [this.employee.company, []],
      address: [this.employee.address, [Validators.required]],
      business_phone: [this.employee.business_phone, [validatePhone]],
      email_address: [this.employee.email_address, [Validators.required, Validators.email]],
      fax_number: [this.employee.fax_number, []],
      home_phone: [this.employee.home_phone, []],
      job_title: [this.employee.job_title, []],
      mobile_phone: [this.employee.mobile_phone, []]
    });
  }
  onUpdate(): void {
    if (this.editForm.valid) {
      if (this.editForm.dirty) {
        const newEmployee = { ...this.employee, ...this.editForm.value };

        this.update.emit(newEmployee);

      } else {
        console.log('no se actualizo nada.')
      }

    }
  }
}
