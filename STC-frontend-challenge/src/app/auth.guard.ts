import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AuthService } from './shared/auth.service'
import { of, switchMap } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

export const AuthGuard: CanActivateFn | CanActivateChildFn = (next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const router: Router = inject(Router)
  let url: string = state.url;
  // Check the authentication status
  return checkUserLogin(next, url)
    .pipe(
      switchMap((authenticated) => {
        // If the user is not authenticated...
        if (!authenticated) {
          // Redirect to the sign-in page with a redirectUrl param
          const redirectURL =
            state.url === '/sign-out' ? '' : `redirectURL=${state.url}`
          const urlTree = router.parseUrl(`auth/sign-in?${redirectURL}`)

        }
        // Allow the access
        return of(true)
      }),
    )
}

export const checkUserLogin = (route: ActivatedRouteSnapshot, url: any) => {
  const authService: AuthService = inject(AuthService)
  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      openSnackBar()
      return of(false);
    }
    return of(true);
  }
  openSnackBar()
  return of(false);

}

const openSnackBar = () => {
  const _snackBar: MatSnackBar = inject(MatSnackBar)
  const _router: Router = inject(Router)
  _snackBar.open('invalid credentials','',{duration:1000})
  _router.navigate(['login'])
}
