import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookieService:CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve token from localStorage or a service
    const token = JSON.stringify(localStorage.getItem('udahLoginNich')); // Adjust this based on your storage method

    const parsedToken = JSON.parse(token)
    // Clone the request to add the Authorization header if the token exists
    // if (parsedToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${JSON.parse(parsedToken).token}`, // Add the JWT token to the headers
    //     },
    //   });
    // }


    const cookiesTOken = JSON.stringify(this.cookieService.get('static_token'))
    const static_token = cookiesTOken

    if(static_token){
      request = request.clone({
        setHeaders:{
          Authorization: `${JSON.parse(static_token)}`
        }
      })
    }

    return next.handle(request);
  }
}
