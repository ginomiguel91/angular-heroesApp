import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanMatchFn = (route:Route, 
  segments:UrlSegment[]) => {

    const authService = inject(AuthService);
    const router = inject(Router);
   return authService.verificaAutenticacion()
   .pipe(

    tap(estaAutenticado=>
      {

        if(!estaAutenticado){
          router.navigate(['./auth/login'])
        }
      }
      
      )
   )
   
   ;
//  if(authService.auth.id){
//   return true;
//  }
//  console.log('Bloqueado por el AuthGuard-CanMatch');
//   return false;
};

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.verificaAutenticacion()
   .pipe(

    tap(estaAutenticado=>
      {

        if(!estaAutenticado){
          router.navigate(['./auth/login'])
        }
      }
      
      )
   )
  // if(authService.auth.id){
  //   return true;
  //  }
  //  console.log('Bloqueado por el AuthGuard-CanActivate');
  //   return false;
};
