export const SET_PLAYLISTID = 'SET_PLAYLISTID';  // 设置播放歌单id
export const SET_PLAYLIST = 'SET_PLAYLIST';  // 设置播放歌单列表
export const SET_CURRENTPLAYID = 'SET_CURRENTPLAYID';  // 设置播放歌曲id
export const SET_REFRESHPLAYLIST = 'SET_REFRESHPLAYLIST';  // 设置刷新播放列表

export const setPlayListId = playListId => ({
    type: SET_PLAYLISTID,
    playListId
});

export const setPlayList = playList => ({
    type: SET_PLAYLIST,
    playList
});

export const setCurrentPlayId = currentPlayId => ({
    type: SET_CURRENTPLAYID,
    currentPlayId
});

export const setRefreshPlayList = refreshPlayList => ({
    type: SET_REFRESHPLAYLIST,
    refreshPlayList
});
