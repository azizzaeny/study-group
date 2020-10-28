import { Component, OnInit, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-pass',
  templateUrl: './request-pass.component.html',
  styleUrls: ['./request-pass.component.css']
})
export class RequestPassComponent implements OnInit {
  transition;
  faUser=faUser;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.enterTransition();
    this.setRootClassName('bg-gradient-purple-s');
  }
  ngOnDestroy() : void {
    this.setRootClassName('');
  }
  enterTransition(){
    this.transition = 'fade-in-right-sm';
  }
  exitTransition(){
    this.transition = 'animate__animated animate__fadeOut';
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

  logoClick(e){
    e.preventDefault();
    this.setRootClassName('');
    this.exitTransition();
    this.navigateTo('/', 50)
    
  }
  handleRequestResetPass(e){
    e.preventDefault();
  }
  
  handleLoginPage(e){
    this.transition = 'fade-out-right-sm';
    this.navigateTo('/login', 500);
  }
  handleSingupPage(e){
    this.transition= 'fade-out-left-sm';
    this.navigateTo('/signup', 400);
    
  }

}
