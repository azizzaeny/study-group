import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  @Input() svgStyle="fill-violet-dark-s size-28";
  @Input() labelStyle="violet-dark-s text-sm font-bold";
  
  constructor() { }

  ngOnInit(): void {
  }

}
