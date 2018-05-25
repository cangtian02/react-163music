import fetch from './fetch';

/**
 * banner
 */
export function banner() {
    return new Promise((resolve, reject) => {
        fetch('banner').then(res => {
            resolve(res);
        });
    });
}

/**
 * 推荐歌单 personalized
 */
export function personalized() {
    return new Promise((resolve, reject) => {
        fetch('personalized').then(res => {
            resolve(res);
        });
    });
}

/**
 * 歌单详情
 * @param {number} id 歌单id
 */
export function playlistDetail(id) {
    return new Promise((resolve, reject) => {
        fetch('playlist/detail?id=' + id).then(res => {
            resolve(res);
        });
    });
}

/**
 * 歌曲url
 * @param {number} id 歌曲id
 */
export function musicUrl(id) {
    return new Promise((resolve, reject) => {
        fetch('music/url?id=' + id).then(res => {
            resolve(res);
        });
    });
}

/**
 * 歌曲详情
 * @param {id} id 歌曲id
 */
export function songDetail(id) {
    return new Promise((resolve, reject) => {
        fetch('song/detail?ids=' + id).then(res => {
            resolve(res);
        });
    });
}

/**
 * 歌词
 * @param {number} id 歌曲id
 */
export function musicLyric(id) {
    return new Promise((resolve, reject) => {
        fetch('lyric?id=' + id).then(res => {
            resolve(res);
        });
    });
}

/**
 * 模糊搜索
 * @param {string} keywords 关键词
 */
export function search(keywords) {
    return new Promise((resolve, reject) => {
        fetch('search?keywords=' + keywords).then(res => {
            resolve(res);
        });
    });
}

/**
 * 热搜
 */
export function searchHot() {
    return new Promise((resolve, reject) => {
        fetch('search/hot').then(res => {
            resolve(res);
        });
    });
}

/**
 * 排行榜详情
* @param {number} idx 对象key
 */
export function topList(idx) {
    return new Promise((resolve, reject) => {
        fetch('top/list?idx=' + idx).then(res => {
            resolve(res);
        });
    });
}
