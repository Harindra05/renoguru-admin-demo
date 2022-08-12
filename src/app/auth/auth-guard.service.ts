import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable()
export class AuthGuardService {
  cookieValue: any;
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.cookieService.check("renoAdmin")) {
          resolve(true);
      } else {
        this.router.navigateByUrl("/");
        resolve(false);
      }
    });
  }
}
