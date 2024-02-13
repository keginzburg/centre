import { useSearchParams } from "react-router-dom";

import FeedNav from "../feed/FeedNav";
import ErrorMessage from "./ErrorMessage";

function Error() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <FeedNav />
            <ErrorMessage code={searchParams.get('error')}/>
        </>
    )
}

export default Error;