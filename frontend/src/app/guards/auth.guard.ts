import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');


  if (!token) {
    router.navigate(['/login']);
    return false;
  }


  const expectedRole = route.data?.['role'];

  if (expectedRole) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;

    if (userRole !== expectedRole) {
      router.navigate(['/produits']);
      return false;
    }
  }

  return true;
};
