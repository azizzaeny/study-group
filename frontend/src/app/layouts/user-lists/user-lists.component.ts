import { Component, OnInit } from '@angular/core';
import { faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { MemberService } from '../../services/user/member.service'
;
export class IUser{
  email: string;
  status: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  users = this.userService.users$;
  
  transition;
  faCheck=faCheck;
  faUserShield = faUserShield;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private memberService: MemberService
  ) {
    
  }

  reloadData(){
    this.userService.getUserLists()
      .subscribe(function(data){
	console.log(data);
	this.users = data['value'];
      });
    
  }
  ngOnInit(): void {
    this.reloadData();
  }
  
  handleLogout(){
    this.authService.logout().subscribe(success =>{
      if(success){
	this.router.navigate(['']);
      }
    });
  }

  routeToAdd(e){
    this.router.navigate(['dashboard','users', 'add']);
  }

  trackByCardId(index, card){
    return card.email;
  }
  
  deleteUser(email){
    this.userService.deleteUser(email).subscribe(success =>{
      if(success){
	this.reloadData();
      }
    });
  }
  
  updateUser(email){
    this.router.navigate(['dashboard','users', 'update']);
  }
}
