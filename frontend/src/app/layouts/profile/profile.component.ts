import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  transition;
  
  constructor(private router: Router) { }

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
    this.navigateTo('/', 300);
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

