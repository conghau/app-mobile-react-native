import initialState from '../initialState';
import * as type from  '../actionTypes';

export default function vozReducer(state = initialState.voz, action) {
    switch (action.type) {
        case type.VOZ_FETCH_FORUM_SUCCESS: {
            return {
                ...state,
                forums: action.payload || [],
            };
        }
        case type.VOZ_FETCH_FORUM_ERROR: {
            return {
                ...state,
            };
        }
        case type.VOZ_FETCH_THREAD_LIST_SUCCESS: {
            return {
                ...state,
                threads: action.payload || [],
            };
        }
        case type.VOZ_FETCH_THREAD_LIST_ERROR: {
            return {
                ...state,
            };
        }
        case type.VOZ_FETCH_POST_SUCCESS: {
            return {
                ...state,
                posts: action.payload || [],
            };
        }
        case type.VOZ_FETCH_POST_ERROR: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}