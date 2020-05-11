import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from "@angular/common/http";
  import { Observable } from "rxjs";
  import { HttpHeaders } from '@angular/common/http';
  
  export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
      if (req.url.substr(req.url.lastIndexOf('/'),7) != '/signin') {
        const cloneReq = req.clone({
          headers: new HttpHeaders().set(
              "Authorization","Bearer "+ JSON.parse( localStorage.getItem('apiuserresponse')).token
            )
        });
      return next.handle(cloneReq);
      } else {
        console.log("With token");
        return next.handle(req);
      }
    }
  }