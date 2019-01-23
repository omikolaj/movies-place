import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Article } from './../../models/article.model';
import { AddArticle, RemoveArticle } from './../actions/home.actions'

export class ArticleStateModel {
    articles: Article[];
}

@State<ArticleStateModel>({
    name: 'articlesName',
    defaults: {
        articles: []
    }
})

export class ArticleState{
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
    remove({getState, patchState }: StateContext<ArticleStateModel>, { payload }:RemoveArticle) {
        patchState({
            articles: getState().articles.filter(a => a.title !== payload.title)
        })
    }
}
