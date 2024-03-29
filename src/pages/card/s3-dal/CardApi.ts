import {instance} from "../../app/s3-dal/instance";
import {AxiosResponse} from "axios";

export const CardApi = {
    getCards(params: GetCardRequestType) {
        return instance.get<GetCardRequestType, AxiosResponse<GetCardResponseType>>('cards/card', {params})
            .then((res) => res.data);
    },

    addCard(card: AddCardRequestType) {
        return instance.post<AddCardRequestType, AxiosResponse<CardType>>('cards/card', {card});
    },

    deleteCard(params: {id: string}) {
        return instance.delete('cards/card', {params});
    },

    updateCard(params: { card: CardType}) {
        return instance.put('cards/card', params);
    }
};

// send request
export type GetCardRequestType = {
    cardAnswer?: string | null     // english - default value
    cardQuestion?: string   // english - default value
    cardsPack_id?: string | null
    min?: number
    max?: number
    sortCards?: string  // 0updated - default value
    page?: number
    pageCount?: number
}

// get request
export type GetCardResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string | null
}

// get request (card)
export type CardType = {
    answer: string
    question: string
    cardsPack_id?: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated?: Date
    _id: string
}

// post request (create)
export type AddCardRequestType = {
    cardsPack_id: string
    question: string        // если не отправить будет таким - "no question"
    answer: string          // если не отправить будет таким - "no answer"
    grade?: number           // 0..5, не обязателен
    shots?: number
    answerImg?: string       // "url or base 64"
    questionImg?: string       // "url or base 64"
    questionVideo?: string       // "url or base 64"
    answerVideo?: string       // "url or base 64"
}
