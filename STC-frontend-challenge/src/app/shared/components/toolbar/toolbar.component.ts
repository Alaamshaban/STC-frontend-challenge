import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent {
  constructor(private router: Router, private authService: AuthService) { }
  signOut() {
    this.authService.logout().subscribe(() => this.router.navigate(['login'])
    )
  }
}
