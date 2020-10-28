import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  transition;
  alertMessage;
  alertType;
  showAlert = false;
  faLock = faLock;
  faUser = faUser;

  
  constructor(
    private router: Router) {    
  }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.enterTransition();
  }
  ngOnDestroy(): void {
    this.setRootClassName('');
  }
  
  enterTransition(){
    this.transition = 'fade-in-right-sm';
  }
  
  exitTransition(){
    this.transition = 'animate__fadeOut';
  }
  
  logoClick(e){
    e.preventDefault();
    this.transition = 'animate__fadeOut';    
    this.setRootClassName('');
    this.navigateTo('/',100);
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
  
  handleLogin(e){
    //controller;
    e.preventDefault();
    
  }
  
  handleSingup(){
    this.transition = 'fade-out-left-sm';
    this.navigateTo('/signup', 400);
  }
  
  handleForgotpassword(){
    this.transition = 'fade-out-right-sm';
    this.navigateTo('/request-password', 400);
  }
  
}
