# WELCOME TO CENTRE

Check out the [Live Site](https://centre-6754f0a99764.herokuapp.com/)!

### Introduction

![photo of splash](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/splash.png?token=GHSAT0AAAAAACLVQY4G7IFKQ5UMYNOUDW4QZTMWKPA)

Centre is a clone of the Medium website at the time of creation. Medium is an online publishing platform that offers users a library of amateur and professional publications. After signing up, a Medium user can manage their own unique articles. They can also view and applaud other users' articles and follow other users if their content is relevant and of the current user's interest. Medium also curates articles based on popularity and a user's following. As a huge movie fan and amateur movie reviewer, I was interested in building out a publishing platform like Medium's, as anyone can use it and it offers a sleek, user-friendly design. The technologies implemented in this project include:

* Languages: Javascript, Ruby, SQL, HTML, and CSS
* Frontend: React-Redux
* Database: PostgreSQL
* Hosting: Heroku
* Asset Storage: AWS Simple Cloud Storage (S3)

# Features

## Articles

A Centre user is able to create new articles, which persist to both the front and backend. This includes a title, body, and optional photo as well. After creating an article, its author can then revisit it and provide relevant edits if necessary.

![gif of article](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/article-demo.gif?token=GHSAT0AAAAAACLVQY4HYKSREGTML6HVSXJKZTMWMFQ)

```jsx
    return (
        <>
            <FormNav 
                publishDisabled={publishDisabled}
                handleSubmit={handleSubmit}
            />
            <form id="article-form">
                {animate && renderArticleError()}
                <input
                    type="text"
                    value={title}
                    id="title"
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />

                <textarea
                    type="text"
                    value={body}
                    onInput={autoGrow}
                    id="body"
                    placeholder='Tell your story...'
                    onChange={e => setBody(e.target.value)}
                />

                <div id="additional">
                    <CiCirclePlus
                        id="add-button"
                        className={add ? "add" : null}
                        onClick={() => setAdd(prev => !prev)}
                    />
                    {add &&
                    <div id="photo-upload-button">
                        <label htmlFor="article-photo-upload">
                            <MdOutlinePhotoSizeSelectActual id="photo-upload-icon" />
                        </label>
                        <input
                            id="article-photo-upload"
                            style={{display: "none"}}
                            type="file"
                            onChange={handleFile}
                        />
                    </div>}
                </div>

                {preview}
            </form>
        </>
    )
```

A Centre user can also browse a full library of published articles and from there, visit a specific article or its author's profile.

![gif of article library](https://github.com/keginzburg/centre/blob/main/public/images/article-index.gif)

```js
function ArticleIndex({currentUser}) {
    const [clicked, setClicked] = useState("all");
    const dispatch = useDispatch();
    const articles = useSelector(state => state.entities.articles);
    const users = useSelector(state => state.entities.users);
    const articleIds = useSelector(state => state.ui.articleIds);

    useEffect(() => {
        dispatch(fetchArticles('index'));
        return () => dispatch(clearArticleIds());
    }, [dispatch])

    let articlesList;
    
    if (Object.keys(articles).length === 0 || Object.keys(users).length === 0 || !articleIds) return (
        <div id="article-index-container">
            <div id="topics-slider">

            </div>
            <div id="article-index">
                {articlesList}
            </div>
        </div>
    )
    if (clicked === "following") {
        articlesList = Object.values(articles).filter(article => currentUser.followingIds.has(article.authorId)).map((followedArticle, idx) => {
            return <ArticleIndexItem key={idx} article={followedArticle} author={users[followedArticle.authorId]} />;
        })
    } else {
        articlesList = articleIds.map((articleId, idx) => {
            let article = articles[articleId];
            return <ArticleIndexItem key={idx} article={article} author={users[article.authorId]} />;
        });
    }

    return (
        <div id="article-index-container">
            <div id="topics-slider">
                <button
                    id="topics-all"
                    className={clicked === "all" ? "clicked" : null}
                    onClick={() => setClicked("all")}
                >All</button>
                <button 
                    id="topics-following"
                    className={clicked === "following" ? "clicked" : null}
                    onClick={() => setClicked("following")}
                >Following</button>
            </div>
            <div id="article-index">
                {articlesList}
                <div id="caught-up-container">
                    <IoMdCheckmarkCircleOutline id="caught-up-icon"/>
                    <p>You&apos;re all caught up!</p>
                </div>
            </div>
        </div>
    )
}
```

## Claps

If a Centre user desires, they can applaud specific articles (thereby creating a "clap") to show their appreciation to its author. Claps are a full CRUD resource, so if a user wants to boost their applause, they can actively click the clap button to add more claps to the applause between them and that specific article. However, a user can always reverse their applause and undo any claps they have created for an article as well.

![gif of clap](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/clap.gif?token=GHSAT0AAAAAACLVQY4GNOOKLFKWHYP4MGJCZTMWKZQ)

```js
const ClapButton = ({owned, existingClap, articleId}) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const clapError = useSelector(state => state.error.clap);

    const [ownedTip, setOwnedTip] = useState(false);
    const [clapTip, setClapTip] = useState(false);
    const [clapClicked, setClapClicked] = useState(false);

    const ownedToolTip = () => setOwnedTip(prev => !prev);
    const clapToolTip = () => setClapTip(prev => !prev);

    const handleClap = () => {
        if (!currentUser) {
            dispatch(setModal("signup"));
            return;
        }

        if (clapClicked) return;

        setClapClicked(true);

        if (existingClap) {
            dispatch(updateClap(existingClap.id))
        } else {
            let clap = {
                clappableType: "Article",
                clappableId: articleId,
                amount: 1
            }
            dispatch(createClap(clap))
        }
        setTimeout(() => setClapClicked(false), 900);
    }

    if (owned) return (
        <div id="clap-button-owned" onMouseEnter={ownedToolTip} onMouseLeave={ownedToolTip}>
            {ownedTip && <p id="owned-tip">You cannot applaud your own story</p>}
            <PiHandsClappingThin />
        </div>
    )

    return (
        <div id="clap-button" onMouseEnter={clapToolTip} onMouseLeave={clapToolTip} onClick={handleClap}>
            {clapTip && !clapClicked && <p id="clap-tip">Clap</p>}
            <div id="clap-icon">
                {clapClicked && <p id="clap-tip-count">+{existingClap && existingClap.amount}</p>}
                {clapClicked && <img src={confetti} id="confetti-effect" alt="confetti-effect" />}
                {existingClap ? <PiHandsClappingFill id="clap-icon-svg" className={clapError ? 'clap-error' : null}/> : <PiHandsClappingThin id="clap-icon-svg"className={clapError ? 'clap-error' : null}/>}
            </div>
        </div>
    )
};

export default ClapButton;
```

In addition to creating, updating, or deleting claps, Centre users can also view which users have already added applause to an article. The amount of each user's applause is private, but the total number of claps for each article is not. This total number of claps will affect an article's standing in popularity within the Splash page's Trending section.

![gif of claps](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/claps.gif?token=GHSAT0AAAAAACLVQY4GBPOGFORQA357R35WZTMWKXQ)

## Follows

If a Centre user finds another user whose content they appreciate, they can also follow that user. With this in mind, a user can accrue a following if other users follow them. Follows will affect what content a user sees if they visit the "Following" category in the main article library. After following another author, a user can always choose to unfollow them as well.

![gif of follow](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/follow.gif?token=GHSAT0AAAAAACLVQY4G6YGTICRTQJLCX6R6ZTMWKVQ)

```js
const ClapperFollowButton = ({currentUser, author}) => {
    const dispatch = useDispatch();
    const followError = useSelector(state => state.error.follow ? state.error.follow : undefined);
    const follows = useSelector(state => state.entities.follows ? state.entities.follows : undefined);

    const [clicked, setClicked] = useState(false);

    if (!currentUser || !author || !follows)
    return <span id="clapper-follow" onClick={() => dispatch(setModal("signup"))}>Follow</span>;

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
    }
    
    return (
        <span
            id={followed ? "clapper-followed" : "clapper-follow"} 
            className={followError && followError[followError.length-1] === author.id ? "error" : null}
            onClick={handleFollow}
        >
            {followed && !clicked ? "Following" : "Follow"}
            {clicked ? "Loading" : null}
        </span>
    )
}
```

## Profile

After sign up, every Centre user is provided a unique Profile page as well. A user's profile will be curated to their articles, a list of their followers, and a list of the authors they are following.

![gif of profile](https://raw.githubusercontent.com/keginzburg/centre/main/public/images/profile.gif?token=GHSAT0AAAAAACLVQY4H23V5R2ON5563FNPQZTMWKTA)

```js
const ProfileShow = () => {
    const params = useParams();
    const { userId } = params;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [section, setSection] = useState("main");

    const currentUser = useSelector(state => state.session.user);
    const modal = useSelector(state => state.ui.modal);
    const user = useSelector(state => userId ? state.entities.users[userId] : undefined);
    const error = useSelector(state => state.error.profile ? state.error.profile : undefined);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [userId, dispatch])

    const handleMainSection = () => setSection("main");

    if (error) navigate('/error?error=404');

    if (!user || !user.followerIds || !user.followingIds) {
        return (
            <>
            <FeedNav />
            <div id="profile-loading">
                    <PulseLoader
                        id="profile-loader"
                        color="#191919"
                        margin={4}
                        size={15}
                        speedMultiplier={1}
                    />
            </div>
        </>
        )
    }

    return (
        <>
            {modal === 'login' ? <Modal animate={true}><LoginForm /></Modal> : null}
            {modal === 'login-no-animate' ? <Modal animate={false}><LoginForm /></Modal> : null}
            {modal === 'signup' ? <Modal animate={true}><SignupForm /></Modal> : null}
            {modal === 'signup-no-animate' ? <Modal animate={false}><SignupForm /></Modal> : null}
            <FeedNav />
            <div id="profile">
                {section === "main" && <ProfileMain user={user}/>}
                {section === "followers" && <ProfileFollowers handleMainSection={handleMainSection} user={user} type={"followers"} setSection={setSection}/>}
                {section === "following" && <ProfileFollowers handleMainSection={handleMainSection} user={user} type={"following"} setSection={setSection}/>}
                <div id="profile-sidebar">
                    <div id="profile-sidebar-main">
                        <img src={user.photoUrl} alt="profile-photo"/>
                        <h3>{user.name}</h3>
                        <p onClick={() => setSection("followers")}>{user.followerIds.length !== undefined ? user.followerIds.length : user.followerIds.size} followers</p>
                        <p onClick={() => setSection("following")}>{user.followingIds.length !== undefined ? user.followingIds.length : user.followingIds.size} following</p>

                        <ClapperFollowButton currentUser={currentUser} author={user}/>
                    </div>
                    <div id="profile-sidebar-links">
                        <a href="https://www.linkedin.com/in/kyleginzburg/" target="_blank" rel="noreferrer">LinkedIn</a>    
                        <a href="https://github.com/keginzburg" target="_blank" rel="noreferrer">GitHub</a>    
                        <a href="https://wellfound.com/u/kyle-ginzburg" target="_blank" rel="noreferrer">Wellfound</a>    
                    </div>
                </div>
            </div>
        </>
    )
}
```

### Future Implementations

As of now, Centre boasts four main features (Articles, Claps, Follows, Profile), but I am currently working on adding the following to Centre:

+ Profile CRUD - The Profile page currently curates a user's articles and their followers/following, but I'd like to personalize the Centre experience by allowing users to edit their profile information (name, profile photo, etc.).
+ Comments CRUD - While users can follow other users and applaud their content, I plan on adding Comments as a full feature, allowing users to comment on other users' articles and add to a community discussion.
+ Comment Claps - Currently, Claps are a full CRUD resource that associate a user with a specific article. However, Claps have been implemented as a polymorphic resource in my backend. With that backend structure already built, I plan on integrating a Comments table and making it possible to either applaud an article or a comment.

### Thanks

Thank you for your time and consideration! I hope you enjoy Centre!

### Attributions

+ Medium favicon created by [Freepik](https://www.flaticon.com/authors/freepik) - Flaticon
