import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./ClapViewer.css";

import { filterClappers } from "../../util/util";

import ClapperFollowButton from "../../follows/ClapperFollowButton";

import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const ClapViewer = ({article, clapCount, claps}) => {
    const users = useSelector(state => state.entities.users ? state.entities.users : undefined);
    const currentUser = useSelector(state => state.session.user ? state.session.user : undefined);

    const clappers = filterClappers(article, claps, users);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    if (!users) return (
        <div id="clap-viewer-container">
            <h1 id="clap-viewer-title">
                <PulseLoader 
                    color="#191919"
                    margin={4}
                    size={10}
                    speedMultiplier={1}
                />
            </h1>
            <ul>
                <PulseLoader 
                    color="#191919"
                    margin={4}
                    size={15}
                    speedMultiplier={1}
                />
            </ul>
        </div>
    )

    return (
        <div id="clap-viewer-container">
            <h1 id="clap-viewer-title">
                {clapCount} {clapCount === 1 ? "clap" : "claps"} from {clappers.length} {clappers.length === 1 ? "person" : "people"} for &quot;{article.title}&quot;
            </h1>
            <ul>
                {clappers.map((clapper, idx) => {
                    return (
                    <li key={idx} id="clapper-container">
                        <div id="clapper-details">
                            <img src={clapper.photoUrl} alt="clapper-image"/>
                            <Link to={`/users/${clapper.id}`}>
                                <h2>{clapper.name}</h2>
                            </Link>
                        </div>
                        <ClapperFollowButton currentUser={currentUser} author={clapper} />
                    </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default ClapViewer;