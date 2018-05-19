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
