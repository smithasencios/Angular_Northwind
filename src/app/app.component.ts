import { Component } from '@angular/core';
import * as process from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(){
    console.log("begin")
    console.log(process.env)
    console.log("end")
  }
}
