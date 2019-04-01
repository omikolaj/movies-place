import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private authService: AuthService) { }

}
