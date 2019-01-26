import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Article } from './../../models/article.model';
import { AddArticle, RemoveArticle, FetchArticles, GetArticle } from '../actions/article.actions'
import { ArticleService } from 'src/app/services/article/article.service';
import { tap } from 'rxjs/operators';

export interface ArticleStateModel {
    articles: Article[];
}

@State<ArticleStateModel>({
    name: 'articles',
    defaults: {
        articles: []
    }
})

export class ArticleState{    
    constructor(private articleService: ArticleService) {}

    @Selector()
    static getArticles(state: ArticleStateModel){
        return state.articles;
    }

    @Action(AddArticle)
    add({getState, patchState}: StateContext<ArticleStateModel>, { payload }:AddArticle){
        const state = getState();
        patchState({
            articles: [...state.articles, payload]
        })
    }

    @Action(RemoveArticle)
    remove({getState, patchState}: StateContext<ArticleStateModel>, { payload }: RemoveArticle) {
        patchState({
            articles: getState().articles.filter(a => a.title !== payload.title)
        })
    }

    @Action(FetchArticles)
    fetchAll({getState, patchState}: StateContext<ArticleStateModel>){
        patchState({
            articles: this.articleService.fetchArticles()
        })
        // return this.articleService.fetchArticles().pipe(tap((articlesResults) => {
        //     const state = getState();
        //         patchState({
        //         ...state,
        //         articles: [                    
        //             ...articlesResults                    
        //         ]
        //     })
        // }))        
    }
}
