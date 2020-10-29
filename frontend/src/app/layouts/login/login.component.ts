import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  transition;
  alertMessage;
  alertType;
  isSubmitted = false;
  isSuccess;
  message;
  value;
  isError;
  hidden;
  showAlert = false;
  faLock = faLock;
  faUser = faUser;
  loginForm: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.enterTransition();
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
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

  reset(){
    this.f.email.setValue('');
    this.f.password.setValue('');
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
  
  get f(){ return this.loginForm.controls;}

  handleLogin(e){
    e.preventDefault();
    let t = this;
    this.isSubmitted = true;
    this.authService.login({
      email: this.f.email.value,
      password: this.f.password.value
    }).subscribe(data => {
      console.log(data);
      
      if(data.success){
	let email = this.f.email.value;
	this.isSuccess = true;
	t.navigateTo('/', 400);
      }else{
	this.isSuccess= false;
	this.message = data.message;
      }
      this.reset();
      
    });
    
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
