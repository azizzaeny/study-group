import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type IButtonType = 'primary' | 'tertiary' | 'secondary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()  label : string = "";
  @Input()  type:  string =  '';
  @Input()  moreClass: string = "";
  @Output() buttonClick  = new EventEmitter();
  
  constructor() {
  }

  onButtonClick(e){
    this.buttonClick.emit(e);
  }
  ngOnInit(): void {
  }

}
