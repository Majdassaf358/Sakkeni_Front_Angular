import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken: string | null = null;

  if (typeof localStorage !== 'undefined') {
    myToken = localStorage.getItem('Token');
  }
  if (myToken) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + myToken,
        'Content-Type': 'application/json',
      },
    });
  }
  return next(req);
};
