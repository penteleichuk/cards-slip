import {CardPacksType, GetPacksResponse, PackApi} from "../../s3-dal/PackApi";
import {Dispatch} from "redux";
import {AppStoreType} from "../../../app/s2-bll/store";

export type PackStateType = GetPacksResponse;

const PackInitState: PackStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4
}

export const packSortReducer = (state:PackStateType = PackInitState, action: PackActionsType): PackStateType => {
    switch (action.type) {
        case 'SET-CARDS-SORT':
            return {...state, cardPacks: action.cardPacks}
        default: {
            return state;
        }
    }
}

const setCardsSort = (sortItem: string) => async (dispatch: Dispatch, getState: () => AppStoreType) => {
    const state = getState().pack
    const params = {page: state.page, pageCount: state.pageCount, sortPacks: 0 + sortItem}

    try {
        const res = await PackApi.getPacks(params)
        dispatch(setCardsSortAC(res.cardPacks))
    } catch (e) {
        console.log(e)
    }
}

const setCardsSortAC = (cardPacks: CardPacksType[]) => ({type: 'SET-CARDS-SORT', cardPacks} as const)

export type PackActionsType =
    | ReturnType<typeof setCardsSortAC>
