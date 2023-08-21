import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'admin', loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: 'user', loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
