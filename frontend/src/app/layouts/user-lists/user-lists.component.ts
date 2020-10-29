import { Component, OnInit } from '@angular/core';
import { faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';


@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  transition;
  faCheck=faCheck;
  faUserShield = faUserShield;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }

}
