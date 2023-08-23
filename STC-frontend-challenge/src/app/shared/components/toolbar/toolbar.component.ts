import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {
  constructor(private router: Router) { }
  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
