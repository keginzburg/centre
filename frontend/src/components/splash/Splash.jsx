import SplashNav from "./SplashNav";
import SplashMain from "./SplashMain";
import TrendingIndex from "./Trending/TrendingIndex";
import Footer from "./Footer";

import "./Splash.css";

function Splash() {

    return (
        <>
            <SplashNav />
            <SplashMain />
            <TrendingIndex />
            <Footer />
        </>
    )
}

export default Splash;