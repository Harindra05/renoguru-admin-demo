import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class ApiService {
    public endpoint = environment.apiUrl;
    public httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    constructor(private http: HttpClient,
         private cookie: CookieService
         ) { }
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
    get(url: any): Promise<any> {
        return this.http.get(this.endpoint + url, this.getHeaders()).toPromise()
    }

    post(url: any, body: any): Promise<any> {
        return this.http.post<any>(this.endpoint + url, body, this.getHeaders()).pipe(
            map(this.extractData),
            catchError(this.handleError)
        ).toPromise()
    }

    handleError(error: any) {
        console.log(error)
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(error.error);
    }

    delete(url: any): Observable<any> {
        return this.http.delete<any>(this.endpoint + url, this.getHeaders()).pipe(
            map(this.extractData));
    }

    getHeaders() {
        let userData: any;
        if (this.cookie.check('renoAdmin')) {
            if (this.cookie.get("renoAdmin")) {
                userData = JSON.parse(this.cookie.get("renoAdmin")); 
            }
            this.httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "" + userData.token
                })
            };
        }
        return this.httpOptions
    }
}