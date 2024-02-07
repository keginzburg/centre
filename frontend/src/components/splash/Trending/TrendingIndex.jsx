import TrendingIndexItem from "./TrendingIndexItem";

function TrendingIndex() {
    const data = [1,2,3,4,5,6]

    return (
        <div id="trending-main">
            {data.map(datum => {
                return <TrendingIndexItem key={datum} datum={datum} />;
            })}
        </div>
    )
}

export default TrendingIndex;