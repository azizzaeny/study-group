import { Component, OnInit, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserService} from './../../services/user/user.service';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-pass',
  templateUrl: './request-pass.component.html',
  styleUrls: ['./request-pass.component.css']
})
  export class RequestPassComponent implements OnInit {
    transition;
    faUser=faUser;
    message = '';
    requestPassForm: FormGroup;
    isLoading = false;
    token_link;
    
    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private userService: UserService
    ) { }

    ngOnInit(): void {
      this.enterTransition();
      this.setRootClassName('bg-gradient-purple-s');
      this.requestPassForm = this.formBuilder.group({
	email : ['',Validators.required]
      });
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
      let message = this.message;
      let token_link = this.token_link;      
      this.userService.requestResetPassword(this.requestPassForm.value)
	.subscribe( res  => {
	  this.isLoading = true
	  if(res.success == true){
	    message = res.msg;
	    token_link = 'http://localhost:4200/reset-password/'+res.value.auth.reset_token;
	  }else{
	    message = res.type
	  }
	  console.log(message);
	}, (err)=>{
	  console.log(err);
	  this.isLoading = false;
      });
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
