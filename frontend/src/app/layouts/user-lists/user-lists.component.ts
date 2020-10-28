import { Component, OnInit } from '@angular/core';

import { faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.css']
})
export class UserListsComponent implements OnInit {

  transition;
  faCheck=faCheck;
  faUserShield = faUserShield;
  constructor() { }

  ngOnInit(): void {
  }
  handleLogout(){}

}
