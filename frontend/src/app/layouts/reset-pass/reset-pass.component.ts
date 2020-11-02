import { Component, OnInit } from '@angular/core';
import {  Router,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  transition;
  faLock = faLock;
  message;
  resetPassForm: FormGroup;
  token;
  email;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {    
  }

  ngOnInit(): void {
    this.setRootClassName('bg-gradient-purple-s');
    this.enterTransition();
    console.log(this.route.snapshot.params);
    this.token = this.route.snapshot.params.token;
    this.resetPassForm = this.formBuilder.group({
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    this.email = this.authService.loggedUser;
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
    let tokenSpec = this.token.split('.');
    console.log(tokenSpec);
    let email = atob(tokenSpec[0]);
    let form_request = Object.assign(this.resetPassForm.value,{
      token: this.token,
      email: email
    });
    this.userService.resetPassword(form_request).subscribe(res =>{
      console.log(res);
    });
  }


}
