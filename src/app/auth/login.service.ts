import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class LoginserviceService {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (!this.cookieService.check("renoAdmin")) {
        resolve(true);
      } else {
          this.router.navigateByUrl("/dashboard");
          resolve(false);
        }
    });
  }
}