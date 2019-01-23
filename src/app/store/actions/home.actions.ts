import { Article } from './../../models/article.model';

export class AddArticle {
    static readonly type = '[ARTICLE] Add';

    constructor(public payload: Article) {}
}

export class RemoveArticle{
    static readonly type = '[ARTICLE] Remove';
    constructor(public payload: Article) {}
}
