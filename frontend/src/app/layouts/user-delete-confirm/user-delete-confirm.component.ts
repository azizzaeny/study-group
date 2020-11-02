import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrls: ['./user-delete-confirm.component.css']
})
export class UserDeleteConfirmComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  handleCancel(){
    this.router.navigate(['dashboard','users']);
  }
  handleYes(){
    let email =this.route.snapshot.params.email;
    this.userService.deleteUser(email).subscribe(success =>{
      console.log(success);
      if(success){
	this.router.navigate(['dashboard','users']);
      }
    });
  }
}
