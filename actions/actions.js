export const DECKS_LOAD_START = 'DECKS_LOAD_START';
export const DECKS_LOAD_SUCCESS = 'DECKS_LOAD_SUCCESS';
export const DECKS_LOAD_ERROR = 'DECKS_LOAD_ERROR';


export const DECK_LOAD_START = 'DECK_LOAD_START';
export const DECK_LOAD_SUCCESS = 'DECK_LOAD_SUCCESS';
export const DECK_LOAD_ERROR = 'DECK_LOAD_ERROR';

export const DECK_ADD = 'DECK_ADD';
export const DECK_ADD_QUESTION = 'DECK_ADD_QUESTION';


export const allDecksStart = () => {
    return {
        type: DECKS_LOAD_START,
    }
};

export const allDecksReceived = (data) => {
    return {
        type: DECKS_LOAD_SUCCESS,
        data
    }
};

export const allDecksError = (data) => {
    return {
        type: DECKS_LOAD_ERROR,
        data: null
    }
};


export const deckLoadStart = () => {
    return {type: DECK_LOAD_START}
};

export const deckLoadSuccess = (data) => {
    return {type: DECK_LOAD_SUCCESS, data}
};

export const deckLoadError = (data) => {
    return {type: DECK_LOAD_ERROR, data: null}
};


export const deckAdd = (deckId, deckTitle) => {
    return {
        type: DECK_ADD,
        id: deckId,
        deckTitle
    }
};
export const deckAddQuestion = (deckId, question) => {
    return {
        type: DECK_ADD_QUESTION,
        id: deckId,
        question
    }
};
