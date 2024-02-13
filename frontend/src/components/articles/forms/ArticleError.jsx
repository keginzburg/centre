import './ArticleError.css';

function ArticleError({error}) {

    return (
        <span id="article-error" className='appear'>{error}</span>
    )
}

export default ArticleError;