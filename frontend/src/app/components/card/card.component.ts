import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons';

export interface IUserCard {
  first_name : string;
  last_name : string;
  email: string;
  last_updated: string;
  status: string;
  profile_pic: string,
  active: Boolean 
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    last_updated: '',
    created_at: '',
    status: '',
    validated_email: '',
    auth: {
      password: '',
      method: '',
      roles: '',
      verify_token: '',
      reset_token: ''
    },
    profile_pic:{
      url: '',
      file_blob: ''
    }
  }
  faCheck=faCheck;
  faUserShield = faUserShield;
  
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() create = new EventEmitter();
  
  constructor() { }
  ngOnInit(): void {
  }

}
