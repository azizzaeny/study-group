import { Component, OnInit, Input, Output } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  transition;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.transition = 'fade-in-left-sm';
  }
  
  ngOnDestroy(): void{
    this.setRootClassName('');
  }
  logoClick(e){
    e.preventDefault();
    this.transition = 'animate__fadeOut';
    this.navigateTo('/', 400);
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
  
  handleLoginPage(e){
    e.preventDefault();
    this.transition = 'fade-out-right-sm';
    this.navigateTo('/login', 400);
  }
  handleRegister(e){
    e.preventDefault();
  }
}
