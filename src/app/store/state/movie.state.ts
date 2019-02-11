import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { FetchMovieDetails } from '../actions/movie.actions';

export interface MovieStateModel {
    movies: Movie[];
    movie: Movie;
}

@State<MovieStateModel>({
    name: 'movies',
    defaults: {
        movies: [],
        movie: {
            id: 1,            
            title: "",
            favorites: [],
            posts: []            
        }
    }
})

export class MovieState{
    constructor(private movieService: MovieService){}

    @Selector()
        static getMovies(state: MovieStateModel){
            return state.movies
        }

    @Action(FetchMovieDetails)
    getArticle({getState, patchState}: StateContext<MovieStateModel>, { payload }:FetchMovieDetails) {
        console.log(getState().movies.filter(a => a.id === payload))
    }
    
}