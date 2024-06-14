import { createFollow, deleteFollow } from "../../store/follow";
import { setModal } from "../../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const OptionsFollowButton = ({currentUser, author, existingClap, setDropdown}) => {
    const dispatch = useDispatch();
    const followError = useSelector(state => state.error.follow ? state.error.follow : undefined);
    const follows = useSelector(state => state.entities.follows ? state.entities.follows : undefined);

    const [clicked, setClicked] = useState(false);
    
    if (!currentUser || !author || !follows) return (
        <span
            id="follow-author"
            className={existingClap ? null : "no-border-top"}
        >
            Follow author
        </span>
    )

    if (currentUser.id === author.id) return null;
    
    const followed = currentUser.followingIds.has(author.id);
    let follow;
    if (followed) {
        for (const id in follows) {
            const currentFollow = follows[id];
            if (currentFollow.followerId === currentUser.id && currentFollow.userId === author.id) {
                follow = currentFollow;
                break;
            }
        }
    }

    const handleFollow = () => {
        if (!currentUser) {
            dispatch(setModal("signup"));
            return;
        }

        setClicked(true);
        if (followed) {
            dispatch(deleteFollow(follow.id));
        } else {
            const follow = {
                followerId: currentUser.id,
                userId: author.id
            };
            dispatch(createFollow(follow));
        }
        setClicked(false);
        setDropdown(false)
    }

    return (
        <span
            id={followError && followError[followError.length-1] === author.id ? "follow-author-error" : "follow-author"}
            className={existingClap ? null : "no-border-top"}
            onClick={handleFollow}
        >
            {followed && !clicked ? "Unfollow author" : "Follow author"}
            {clicked ? "Loading" : null}
        </span>
    )
}

export default OptionsFollowButton;