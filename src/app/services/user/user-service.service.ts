import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient) { }


}
