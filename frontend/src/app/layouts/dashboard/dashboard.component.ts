import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

import {  ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transition;
  constructor(private userService: UserService, private authService: AuthService,
	      private router: Router) { }

  ngOnInit(): void {
  }
  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }
  handleSecret(){    
    this.userService.getInitalSeeds().subscribe(data => {
      console.log('success recieved data');
      console.log(data);
    });
  }

}
