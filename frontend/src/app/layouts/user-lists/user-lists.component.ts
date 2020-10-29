import { Component, OnInit } from '@angular/core';
import { faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';


@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  users$;
  users;
  user = {
    first_name: 'aziz',
    last_name: 'zaeny',
    email: 'aziz@gmail.com',
    phone: '',
    last_updated: '2 days ago',
    created_at: '',
    status: 'Active',
    validated_email: '',
    auth: {
      password: '',
      method: '',
      roles: '',
      verify_token: '',
      reset_token: ''
    },
    profile_pic:{
      url: 'https://github.com/me.jpg',
      file_blob: ''
    }
  };  
  transition;
  faCheck=faCheck;
  faUserShield = faUserShield;
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.users$ = this.userService.users$;
  }

  ngOnInit(): void {
  }
  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }

  trackByCardId(index, card){
    return card.email;
  }

}
