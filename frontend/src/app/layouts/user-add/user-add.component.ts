import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  addUserForm: FormGroup;
  transition;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
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
  }
  
  handleAddUser(e){
    e.preventDefault();
    
    let valid = false;
    let email = this.addUserForm.value.email;
    let isValid = this.addUserForm.value.validated_email;
    if(isValid == 1){
      valid = true;
    }
    let formRequest = Object.assign(this.addUserForm.value,{
      roles: ['users'],
      method: 'members',
      email: email,
      validated_email: valid
    });

    this.userService.addUser(email, formRequest).subscribe(res=>{
      console.log(res);
      if(res){
	this.router.navigate(['dashboard','users']);
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
