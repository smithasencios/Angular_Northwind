import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit {

  @Input() label: string = '';
  @Input() value: string = '0';
  constructor() { }

  ngOnInit() {
  }

}
