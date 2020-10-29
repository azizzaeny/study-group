import { Component, OnInit } from '@angular/core';

import {  ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

import {UserService} from './../../services/user/user.service';
import {AuthService} from './../../services/auth/auth.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  transition;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.setRootClassName('bg-near-white-2s');
    this.userService.getProfileUser().subscribe(data=> console.log(data));  
  }
  
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

    handleUpdateProfile(e){
      e.preventDefault();
    }
    navigateTo(url, delay){
      let router = this.router;
      setTimeout(function(){
	router.navigate([url],{ relativeTo: this.route });
      }, delay);
    }
}
