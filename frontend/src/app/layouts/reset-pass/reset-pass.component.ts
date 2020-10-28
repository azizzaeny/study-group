import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  transition;
  faLock = faLock;
  
  constructor(
    private router: Router) {    
  }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.enterTransition();
  }
  ngOnDestroy() : void {
    this.setRootClassName('');
  }
  enterTransition(){
    this.transition = 'animate__fadeIn';
  }
  
  exitTransition(){
    this.transition = 'animate__fadeOut';
  }
  
  logoClick(e){
    e.preventDefault();
    this.setRootClassName('');
    this.transition = 'animate__fadeOut';    
    this.navigateTo('/',300);
  }

  setRootClassName(c){
    document.body.className = c;
  }
  
  navigateTo(url, delay){
    let router = this.router;
    setTimeout(function(){
      router.navigate([url],{ relativeTo: this.route });
    }, delay);
  }
  handleResetPassword(e){
    e.preventDefault();
  }
  // password/reset/edit


}
