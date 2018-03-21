export const DECKS_LOAD_START = 'DECKS_LOAD_START';
export const DECKS_LOAD_SUCCESS = 'DECKS_LOAD_SUCCESS';
export const DECKS_LOAD_ERROR = 'DECKS_LOAD_ERROR';


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
