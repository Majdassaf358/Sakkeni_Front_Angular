import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken: string | null = null;
  if (typeof localStorage !== 'undefined') {
    myToken = localStorage.getItem('Token');
  }

  let headers = req.headers;

  if (myToken) {
    headers = headers.set('Authorization', `Bearer ${myToken}`);
  }

  if (req.body instanceof FormData) {
    console.log('delete');
    headers = headers.delete('Content-Type');
  } else {
    console.log('json');
    headers = headers.set('Content-Type', 'application/json');
  }

  const clonedReq = req.clone({ headers });
  return next(clonedReq);
};
