import {AsyncStorage} from 'react-native';
import * as voz4Rum from '../../lib/voz/forums';
import * as vozThread from '../../lib/voz/thread';
import * as vozPost from '../../lib/voz/posts';
import * as type from  '../actionTypes';


export function getForumList() {
    return function (dispatch) {
        voz4Rum.getForumList().then(data => {
            dispatch({type: type.VOZ_FETCH_FORUM_SUCCESS, payload: data});
            return data;
        }).catch(error => {
            dispatch({
                type: type.VOZ_FETCH_FORUM_ERROR,
                payload: 'something_went_wrong'
            });
            return {};
        });

    };
}

export function getThreadList(forumId, pageNumber = 1) {
    return function (dispatch) {
        vozThread.getThreadList(forumId, pageNumber).then(data => {
            dispatch({type: type.VOZ_FETCH_THREAD_LIST_SUCCESS, payload: data});
            return data;
        }).catch(error => {
            dispatch({
                type: type.VOZ_FETCH_THREAD_LIST_ERROR,
                payload: 'something_went_wrong'
            });
            return {};
        });

    };
}

export function getPostList(threadId, pageNumber = 1) {
    return function (dispatch) {
        vozPost.getPostList(threadId, pageNumber).then(data => {
            dispatch({type: type.VOZ_FETCH_POST_SUCCESS, payload: data});
            console.log('getPostList');
            return data;
        }).catch(error => {
            dispatch({
                type: type.VOZ_FETCH_POST_ERROR,
                payload: 'something_went_wrong'
            });
            return {};
        });

    };
}
