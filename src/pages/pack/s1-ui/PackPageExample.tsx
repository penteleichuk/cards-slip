import {getPacksTC} from "../s2-bll/PackThunks";
import {useDispatch, useSelector} from "react-redux";
import {ActionType, AppStoreType} from "../../app/s2-bll/store";
import {ThunkDispatch} from "redux-thunk";
import {CardPacksType, GetPackRequestType} from "../s3-dal/PackApi";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {RouteNames} from "../../../constants/routes";
import {PaginatedPage} from "../../../components/Paginated/PaginatedPage";
import {setCurrentPageAC} from "../s2-bll/PackActions";
import './PackPage.scss';
import {Input, NavButton, Pack, Tack} from "../../../components/components";
import {
    clearIcon,
    searchIcon,
    createIcon,
    userIcon,
    cardsIcon,
    TextSvg,
    cardsSvg,
    timeSvg, updateSvg
} from "../../../assets/images/icons";
import {logoImg, noPhotoImg} from "../../../assets/images";
import {Range} from "../../../components/_Pack/Range/Range";

export const PackPageExample = React.memo(() => {
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isLoggedIn);
    const paramsCards = useSelector<AppStoreType, GetPackRequestType>(state => state.pack)
    const currentPage = useSelector<AppStoreType, number>(state => state.pack.page)
    const totalPacksCards = useSelector<AppStoreType, number>(state => state.pack.cardPacksTotalCount)
    const countPages = useSelector<AppStoreType, number>(state => state.pack.pageCount)
    const packCards = useSelector<AppStoreType, CardPacksType[]>(state => state.pack.cardPacks)
    const dispatch: ThunkDispatch<AppStoreType, GetPackRequestType, ActionType> = useDispatch()


    const clickPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    useEffect(() => {
        dispatch(getPacksTC({page: currentPage, pageCount: paramsCards.pageCount}))
    }, [currentPage]);

    const [search, setSearch] = useState<string>('');


    if (!isAuth) {
        return <Navigate to={RouteNames.LOGIN}/>
    }

    return (
        <>
            <section className="content">
                <div className="container">
                    <div className="dashboard profiles">
                        <div className="dashboard__container">
                            <div className="header">
                                <div className="header__sidebar">
                                    <div className="logo">
                                        <div className="dashboard__indent">
                                            <div className="logo__content">
                                                <img className={"logo__img"} src={logoImg} alt="Logo"/>
                                                <span className="logo__title">Cards <br/> Slip</span>
                                            </div>
                                        </div>
                                        <div className="profile">
                                            <div className="dashboard__indent">
                                                <div className="profile__content">
                                                    <div className="profile__row">
                                                        <div className="profile__image">
                                                            <img src={noPhotoImg} alt=""/>
                                                        </div>
                                                        <div className="profile__body">
                                                            <div className="profile__name">Vasya Penteleychuk</div>
                                                            <div className="profile__email">waitoatime@gmail.com</div>
                                                        </div>
                                                    </div>
                                                    <button>Edit profile</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header__navigation">
                                    <div className="dashboard__indent">
                                        <div className="header__content">
                                            <div className="header__search">
                                                <Input type={'text'}
                                                       iconBefore={searchIcon}
                                                       iconAfter={clearIcon}
                                                       placeholder={'Search'}
                                                       onChangeText={setSearch}
                                                />
                                            </div>
                                            <div className="header__inputs">
                                                <Tack title="Profile" active={true} iconSrc={userIcon}/>
                                                <Tack title="Pack lists" iconSrc={cardsIcon}/>
                                                <Tack iconSrc={createIcon}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard__content">
                                <div className="dashboard__sidebar">
                                    <div className="dashboard__indent">
                                        <div className="navigation">
                                                <Range min={1} max={15} step={2} value={[1, 15]} title={"Number of cards"} />
                                            <div className="navigation__buttons">
                                                <NavButton title="Name" iconSvg={TextSvg}/>
                                                <NavButton title="Count card" iconSvg={cardsSvg} active/>
                                                <NavButton title="Last updated" iconSvg={timeSvg}/>
                                                <NavButton title="Created by" iconSvg={updateSvg}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard__page">
                                    <div className="dashboard__indent dashboard__pack">
                                        {packCards.map(c =>
                                            <Pack key={c._id}
                                                  author={c.user_name}
                                                  description={c.name}
                                                  packs={c.cardsCount}
                                                  date={c.created}
                                            />
                                        )}
                                        <PaginatedPage onPageChanged={clickPageHandler}
                                                       totalCards={totalPacksCards}
                                                       countPages={countPages}
                                                       currentPage={currentPage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*<div>Pack Page</div>*/}
                        {/*<table>*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>Name</th>*/}
                        {/*        <th>Cards Count</th>*/}
                        {/*        <th>Created</th>*/}
                        {/*        <th>Update</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {packCards.map(c =>*/}
                        {/*        <tr key={c._id}>*/}
                        {/*            <td>{c.name}</td>*/}
                        {/*            <td>{c.cardsCount}</td>*/}
                        {/*            <td>{JSON.stringify(c.created)}</td>*/}
                        {/*            <td>{JSON.stringify(c.updated)}</td>*/}
                        {/*        </tr>*/}
                        {/*    )}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                        {/*<div>*/}
                        {/*    <PaginatedPage onPageChanged={clickPageHandler} totalCards={totalPacksCards}*/}
                        {/*                   countPages={countPages}*/}
                        {/*                   currentPage={currentPage}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>
        </>
    )
})