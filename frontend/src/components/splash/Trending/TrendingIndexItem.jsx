import profile from "./profile-icon.png";

function TrendingIndexItem({datum}) {

    return (
        <div id="trending-index-item">
            <div id="trending-number">
                <p>0{datum}</p>
            </div>
            <div id="trending-article">
                <div id="trending-article-user">
                    <img src={profile} alt="profile" />
                    <p>Name Name</p>
                </div>
                <div id="trending-article-title">
                    <h1>5 Things I Learned about Leadership from the Death and Rebirth of Microsoft</h1>
                </div>
                <div id="trending-article-info">
                    <p>Feb 5 · 10 min read </p>
                </div>
            </div>
        </div>
    )
}
export default TrendingIndexItem;