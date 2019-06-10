import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetEmployees } from '../models/GetEmployees';
import { EmployeeList } from '../models/EmployeeList';
import { Employee } from '../models/Employee';
import { map } from 'rxjs/operators';
import { BestEmployee } from '../models/BestEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(request: GetEmployees): Observable<EmployeeList> {
    return this.http.post<EmployeeList>(`${environment.ApiUrl}employees/paginated`, request);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${environment.ApiUrl}employees/${id}`);
  }
  updateEmployee(employee: Employee): Observable<Response> {
    return this.http.put(`${environment.ApiUrl}employees`, employee)
      .pipe(
        map((response: Response) => response)
      );
  }
  deleteEmployee(employeeId: number): Observable<Response> {
    return this.http.delete(`${environment.ApiUrl}employees/${employeeId}`)
      .pipe(
        map((response: Response) => response)
      );
  }
  getBestEmployee(): Observable<BestEmployee> {
    return this.http.get<BestEmployee>(`${environment.ApiUrl}employees/best`);
  }
  createEmployee(employee: Employee): Observable<Response> {
    return this.http.post(`${environment.ApiUrl}employees`, employee)
      .pipe(
        map((response: Response) => response)
      );
  }
}
