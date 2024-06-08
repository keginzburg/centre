import { useDispatch, useSelector } from "react-redux";

import { setModal } from "../../../store/ui";
import { totalClapAmount } from "../../util/util";

import Modal from "../../modal/Modal";
import ClapButton from "./ClapButton";
import ClapViewer from "./ClapViewer";

import "./ArticleClap.css";

const ArticleClap = ({article}) => {
    const dispatch = useDispatch();

    const modal = useSelector(state => state.ui.modal);
    const currentUser = useSelector(state => state.session.user);

    const claps = useSelector(state => state.entities.claps ? state.entities.claps : undefined);

    if (!claps) return null;
    
    const openClapsModal = () => dispatch(setModal("claps"));

    const existingClap = Object.values(claps).find(clap => clap.clapperId === currentUser.id && clap.clappableId === article.id && clap.clappableType === "Article");

    return (
        <>
            <ClapButton
                owned={currentUser && currentUser.id === article.authorId}
                existingClap={existingClap}
                articleId={article.id}
            />
            <p onClick={openClapsModal} id="clap-count">
                {totalClapAmount(article, claps)}
            </p>

            {modal === 'claps' ?
                <Modal
                    animate={true}
                    deletion={true}
                    type={modal}
                >
                    <ClapViewer
                        article={article}
                        clapCount={totalClapAmount(article, claps)} claps={claps}
                    />
                </Modal>
                :
                null
            }
        </>
    )
}

export default ArticleClap;