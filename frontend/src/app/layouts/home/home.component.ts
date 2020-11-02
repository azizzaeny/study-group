import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transition;
  constructor(private router: Router, private route: ActivatedRoute,
	      private authService : AuthService) { }

  handleButtonLogin(){
    console.log('proceed login');
    //controller;
    this.exitTransition();
    this.transitionTo('/login');
  };
  handleButtonSignup(){
    console.log('proceed signup');
    this.transition = 'fade-out-left-sm';
    this.transitionTo('/signup');
  };

  
  ngOnInit(): void {
    this.enterTransition();
  }

  enterTransition(){
    this.transition = 'animate__fadeIn';
  }
  exitTransition(){
    this.transition = 'fade-out-right-sm';
  }

  transitionTo(url){
    let router = this.router;
    setTimeout(function(){
      router.navigate([url],{ relativeTo: this.route });
    },400);
  }
}
