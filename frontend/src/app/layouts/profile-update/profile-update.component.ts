import { Component, OnInit } from '@angular/core';

import {  ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  transition;
  updateForm: FormGroup;
  authForm: FormGroup;
  picForm: FormGroup;
  
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private formBuilder: FormBuilder) {
    
    this.picForm= this.formBuilder.group({
      pic_url:['']
    });
    this.authForm = this.formBuilder.group({
      password:[''],
      confirm_password:['']
    });
    

    this.picForm = this.formBuilder.group({
      pic_url: ['']});
    
    this.updateForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.setRootClassName('bg-near-white-2s');

    
    this.userService.getProfileUser()
      .subscribe(data =>{
	console.log(data);
      });        
  }
  get f(){ return this.updateForm.controls;}

  get a(){ return this.authForm.controls };
  
  get p(){ return this.picForm.controls }
  
  ngOnDestroy(){
    this.setRootClassName('');
  }
  setRootClassName(c){
    document.body.className = c;
  }

  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }

  handleUpdateAuth(e){
    e.preventDefault();
  }

  handleUpdateProfile(e){
    e.preventDefault();
  }

  handleUpdatePic(e){
    e.preventDefault();
  }

  navigateTo(url, delay){
    let router = this.router;
    setTimeout(function(){
      router.navigate([url],{ relativeTo: this.route });
    }, delay);
  }
}
