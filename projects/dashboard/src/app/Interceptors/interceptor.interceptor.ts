import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken: string | null = null;
  if (typeof localStorage !== 'undefined') {
    myToken = localStorage.getItem('adminToken');
  }

  let headers = req.headers;

  if (myToken) {
    headers = headers.set('Authorization', `Bearer ${myToken}`);
  }

  if (req.body instanceof FormData) {
    headers = headers.delete('Content-Type');
  } else {
    headers = headers.set('Content-Type', 'application/json');
  }

  const clonedReq = req.clone({ headers });
  return next(clonedReq);
};
