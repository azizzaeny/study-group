import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  transition;
  updateUserForm : FormGroup;
  email;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone: [''],
      password: [''],
      pic_url: [''],
      validated_email:[''],
      roles:[''],
      method:['']
    });
    
    this.email = this.route.snapshot.params.email;

  }

  handleUpdateUser(e){

    e.preventDefault();
    
    let valid = false;
    let email = this.email;
    if(this.updateUserForm.value.validated_email ==1){
      valid = true;
    }
    
    let formRequest = Object.assign(this.updateUserForm.value,{
      roles:  ['users'],
      method: 'members',
      validated_email: valid
    });
    
    this.userService.updateUser(email, formRequest).subscribe(res=>{
      console.log(res);
      if(res){
	this.router.navigate(['dashboard', 'users']);
      }
    });
  }

  
  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }
  
}
