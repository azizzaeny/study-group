import { Component, OnInit, Input, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  transition;
  isSuccess;
  isSubmitted = false;
  hidden;
  message;
  value;
  banner;
  
  signupForm: FormGroup; 
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.transition = 'fade-in-left-sm';
    
    this.signupForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      password: [''],
      confirm_password: ['']
    });
    
  }
  
  ngOnDestroy(): void{
    this.setRootClassName('');
  }
  
  get f(){ return this.signupForm.controls;}
  
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
    console.log(this.signupForm);

    this.isSubmitted = true;
    this.authService.signup({
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      password: this.f.password.value
    }).subscribe(data =>{
      this.message = data.message;
      this.value = data.value;
      
      if(data.success){
	let t = this;
	this.isSuccess = true;
	this.banner='Success';
	setTimeout(()=>{
	  t.transition = "fade-out-right-sm";
	  t.navigateTo('/signup-confirm/'+this.f.email.value, 500);
	},700);
      }else{
	this.banner='Failure';
	this.isSuccess = false;
      }
      this.reset();

    });
  }
  reset(){

    this.f.first_name.setValue('');
    this.f.last_name.setValue('');
    this.f.email.setValue('');
    this.f.phone.setValue('');
    this.f.password.setValue('');
    this.f.confirm_password.setValue('');
  }
}
