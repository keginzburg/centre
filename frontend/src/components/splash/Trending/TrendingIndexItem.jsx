import { Link } from "react-router-dom";

function TrendingIndexItem({article, author, num}) {
    return (
        <div id="trending-index-item">
            <div id="trending-number">
                <p>0{num}</p>
            </div>
            <div id="trending-article">
                <Link id="trending-article-user" style={{textDecoration: "none"}} >
                    <img src={author.photoUrl} alt="profile" />
                    <p>{author.name}</p>
                </Link>
                <div id="trending-article-title">
                    <Link to={`/articles/${article.id}`} style={{textDecoration: "none"}}>
                        <h1>{article.title}</h1>
                    </Link>
                </div>
                <div id="trending-article-info">
                    <p>{article.updatedAt.split(",")[0]} · {article.minRead} min read </p>
                </div>
            </div>
        </div>
    )
}
export default TrendingIndexItem;