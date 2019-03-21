import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['']);
  }

  goDaily() {
    this.router.navigate(['dailyvolume']);
  }

  goCompExec() {
    this.router.navigate(['compvsexec']);
  }

  goHourly() {
    this.router.navigate(['hourly']);
  }
}
