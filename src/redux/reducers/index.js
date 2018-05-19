import { combineReducers } from 'redux';
import { SET_PLAYLISTID, SET_PLAYLIST, SET_CURRENTPLAYINDEX } from './../actions/index';

const playListId = (state = [], action) => {
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

const currentPlayIndex = (state = -1, action) => {
    switch (action.type) {
        case SET_CURRENTPLAYINDEX:
            return action.currentPlayIndex;
        default:
            return state;
    }
};

export default combineReducers({
    playListId,
    playList,
    currentPlayIndex
});
