import './CardPage.scss';
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../app/s2-bll/store";
import {useLayoutEffect} from "react";
import {CardType} from "../s3-dal/CardApi";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchCards} from "../s2-bll/CardThunks";

export const CardPage = () => {
    const dispatch = useAppDispatch();

    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const cards = useSelector<AppStoreType, CardType[]>(state => state.card.cards);

    useLayoutEffect(() => {
        dispatch(fetchCards({cardsPack_id: "607fece70857db0004f314d1", max: 20}));
    }, [dispatch,cards]);

    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return <section className="content forgot">
        <b>Pack Page</b>
        <hr/>
        <table>
            <thead>
            <tr>
                <th>Answer</th>
            </tr>
            </thead>
            <tbody>
            {cards.map(c =>
                <tr key={c._id}>
                    <td>{c.answer}</td>
                </tr>
            )}
            </tbody>
        </table>
    </section>
}