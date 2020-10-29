import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() title="Success";
  @Input() text=""
  bannerClass="banner-success";
  @Input() isSuccess = true;
  
  constructor() {
    if(this.isSuccess){
      this.bannerClass="banner-success"
      this.title="Success";
    }else{
      this.bannerClass="banner-failure";
      this.title = 'Failure';
    }
  }

  ngOnInit(): void {
  }

}
