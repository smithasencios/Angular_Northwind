import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private httpClient: HttpClient) { }

  getPermissionsByUserId(userId: string): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(`${environment.ApiUrl}auth/permissions/${userId}`)
  }
}

export class Permission {
  permission_name: string;
  resource_server_name: string;
  description: string;
}

