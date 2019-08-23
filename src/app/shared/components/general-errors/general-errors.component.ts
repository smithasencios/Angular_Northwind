import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-general-errors',
  templateUrl: './general-errors.component.html',
  styleUrls: ['./general-errors.component.scss']
})
export class GeneralErrorsComponent implements OnInit {
  errorMessage: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {  
    this.errorMessage = data.message;
  }

  ngOnInit() {
  }

}
