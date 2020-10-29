import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  transition;
  constructor(private router: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.setRootClassName('bg-near-white-2s');
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
  
  handleProfileUpdate(e){
    e.preventDefault();
    this.navigateTo('/dashboard/profile/update', 200)
  }

  navigateTo(url, delay){
    let router = this.router;
    setTimeout(function(){
      router.navigate([url],{ relativeTo: this.route });
    }, delay);
  }

}

