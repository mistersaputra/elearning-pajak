import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  URL_BASE = 'https://lms-pajak.bosjuragan.com/';

  constructor(
    private http: HttpClient,
  ) { }

  uploadFile(formData: FormData, url, auth=false): Observable<any> {
    let Authorization = 'None';
    if (localStorage.getItem('lms_token') !== null && localStorage.getItem('lms_token') !== undefined) {
      Authorization =  'Bearer '+localStorage.getItem('lms_token');
    }

    let option: any;
    if (auth) {
      option = {
        reportProgress: true,
        observe: 'events',
        responseType: 'text',
        headers: new HttpHeaders({
          'Accept':  'application/json',
          'Authorization': Authorization
        })
      }
    } else {
      option = {
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      }
    }

    return this.http.post(this.URL_BASE + url, formData, option).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}