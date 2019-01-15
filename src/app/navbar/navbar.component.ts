import { Component, OnInit, ViewChild } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public faBars = faBars;
  private navbarOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onMobileMenuClick(){
    this.navbarOpen = !this.navbarOpen;
  }
}
