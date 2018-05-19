export const SET_PLAYLISTID = 'SET_PLAYLISTID';
export const SET_PLAYLIST = 'SET_PLAYLIST';
export const SET_CURRENTPLAYINDEX = 'SET_CURRENTPLAYINDEX';

export const setPlayListId = playListId => ({
    type: SET_PLAYLISTID,
    playListId
});

export const setPlayList = playList => ({
    type: SET_PLAYLIST,
    playList
});

export const setCurrentPlayIndex = currentPlayIndex => ({
    type: SET_CURRENTPLAYINDEX,
    currentPlayIndex
});
