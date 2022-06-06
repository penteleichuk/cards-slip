import {instance} from "../../app/s3-dal/instance";
import {AxiosResponse} from "axios";

export const PackApi = {
    getPacks(params: GetPackRequestType) {
        return instance.get<GetPackRequestType, AxiosResponse<GetPacksResponse>>('/cards/pack', {params})
            .then((res) => res.data);
    },

    addPack(params: { cardsPack: { name?: string, deckCover?: string, private?: boolean } }) {
        return instance.post('/cards/pack', {params});
    },

    deletePack(params: { id: string }) {
        return instance.delete('/cards/pack', {params});
    },

    updatePack(params: { cardsPack: CardPacksType }) {
        return instance.put('cards/pack', params);
    }
}

// Submit a request for getPacks types
type GetPackRequestType = {
    packName?: string   // english - default value
    min?: number
    max?: number
    sortPacks?: string  // 0updated - default value
    page?: number
    pageCount?: number
    user_id?: string
}

export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
}

// Result from query for packs
export type GetPacksResponse = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}