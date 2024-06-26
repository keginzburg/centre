import profile from './profile-icon.png';

import { Link } from 'react-router-dom';

import { abbreviateBody } from '../../util/util';

import './ArticleIndexItem.css';

function ArticleIndexItem({article, author}) {

    return (
        <div id="article-index-item">
            <Link to={`/users/${author.id}`} id="article-index-item-user">
                <img src={author.photoUrl ? author.photoUrl : profile} alt="profile-thumbnail" />
                <span>{author.name}</span>
                <span>·</span>
                <span>{article.createdAt}</span>
            </Link>
            <Link to={`/articles/${article.id}`} id="article-index-item-link">
                <div id="article-index-item-details">
                    <div id="title-body">
                        <h1>{article.title}</h1>
                        <h2>{abbreviateBody(article.body)}</h2>
                    </div>
                    {article.photoUrl && <img src={article.photoUrl} alt="article-thumbnail" />}
                </div>
                <div id="article-index-item-addl">
                    <span>{article.minRead} min read</span>
                </div>
            </Link>
        </div>
    )
}

export default ArticleIndexItem;