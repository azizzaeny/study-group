import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transition;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  handleLogout(){
  }
  handleSecret(){
    
    this.userService.getInitalSeeds().subscribe(data => {
      console.log('success recieved data');
      console.log(data);
    });
  }

}
