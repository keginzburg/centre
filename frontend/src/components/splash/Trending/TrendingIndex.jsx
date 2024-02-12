import arrow from "./arrow-48.png";

import TrendingIndexItem from "./TrendingIndexItem";

function TrendingIndex() {
    const data = [1,2,3,4,5,6]

    return (
        <div id="trending-main">
            <div id="trending-header">
                <img src={arrow} alt="arrow" />
                Trending on Centre
            </div>
            <div id="trending-index">
                {data.map(datum => {
                    return <TrendingIndexItem key={datum} datum={datum} />;
                })}
            </div>
        </div>
    )
}

export default TrendingIndex;