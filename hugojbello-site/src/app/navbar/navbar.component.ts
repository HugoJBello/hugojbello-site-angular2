import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CONFIG } from '../config/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) {}
  navBarToggled:boolean = false
  navBarClass:string = "";
  blogVersion:boolean = false;
  extraStyle:string= "";

  ngOnInit() {
    this.blogVersion= CONFIG.BLOG_VERSION;
    this.extraStyle = (this.blogVersion) ? "blog-background-nav" : "";
  }

  onNabvarClick(){
    console.log(this.navBarClass);
    this.navBarToggled = ! this.navBarToggled;
    this.navBarClass = (this.navBarToggled) ? "collapse":"shown";
  }

}
