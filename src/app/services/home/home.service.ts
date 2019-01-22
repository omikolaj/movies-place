import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  movieSelected = new EventEmitter<number>();
  constructor() { }

  onMovieSelected(id: number){
    
  }
}
