import initialState from '../initialState';

export default function vozReducer(state = initialState.voz, payload) {
    switch (payload.type) {
        case 'VOZ_FETCH_FORUM': {
          return state;
        }
        default:
          return state;
      }
}