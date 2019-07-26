import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/shared/models/permission';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class AuthorizationService {
  
    constructor(private httpClient: HttpClient) { }
  
    getPermissionsByUserId(userId: string): Observable<Permission[]> {
      return this.httpClient.get<Permission[]>(`${environment.ApiUrl}auth/permissions/${userId}`)
    }
  }