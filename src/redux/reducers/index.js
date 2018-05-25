import { combineReducers } from 'redux';
import { SET_PLAYLISTID, SET_PLAYLIST, SET_CURRENTPLAYID, SET_REFRESHPLAYLIST } from './../actions/index';

const playListId = (state = -1, action) => {
    switch (action.type) {
        case SET_PLAYLISTID:
            return action.playListId;
        default:
            return state;
    }
};

const playList = (state = [], action) => {
    switch (action.type) {
        case SET_PLAYLIST:
            return [...action.playList];
        default:
            return state;
    }
};

const currentPlayId = (state = -1, action) => {
    switch (action.type) {
        case SET_CURRENTPLAYID:
            return action.currentPlayId;
        default:
            return state;
    }
};

const refreshPlayList = (state = false, action) => {
    switch (action.type) {
        case SET_REFRESHPLAYLIST:
            return action.refreshPlayList;
        default:
            return state;
    }
};

export default combineReducers({
    playListId,
    playList,
    currentPlayId,
    refreshPlayList
});
