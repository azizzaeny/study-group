import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

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

  handleUpdateProfile(e){
    e.preventDefault();
  }
  navigateTo(url, delay){
    let router = this.router;
    setTimeout(function(){
      router.navigate([url],{ relativeTo: this.route });
    }, delay);
  }
}
