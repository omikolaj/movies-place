import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Store } from '@ngxs/store';
import * as actionTypes from 'src/app/store/actions/movie.actions';

@Injectable({
  providedIn: 'root'
})
export class MoviesFacadeService {  
  
  constructor(private store: Store) { }

  // public fetchMovieDetails(id: number){
  //   console.log(`Dispatching fetchMovieDetails from MovieFacadeService with ID: ${id}`);
  //   this.store.dispatch(new actionTypes.FetchMovieDetails(id));
  // }

}
