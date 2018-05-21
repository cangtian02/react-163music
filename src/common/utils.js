/**
 * 根据数据返回歌曲艺术家字符串
 * @param {array} d 
 */
export function artists(d) {
    let t = '';
    d.forEach((val, i) => {
        t = i === d.length - 1 ? t + val.name : t + val.name + '/';
    });
    return t;
}

/**
 * 获取随机数
 * @param {number} num 错开值，如随机数字一样递归重新获取
 * @param {number} maxNum 随机数最大值
 */
export function getRandom(num, maxNum) {
    if (maxNum === 1) return 1;
    let n = Math.floor(Math.random() * maxNum);
    if (n === num || n === 0) {
        return getRandom(num, maxNum);
    } else {
        return n;
    }
}

/**
 * 处理时间展示
 * @param {number} d 时间秒数 
 */
export function filterTime(d) {
    let h = d > 3600 ? Math.floor(d / 3600) : 0;
    let b = Math.floor((d - h * 3600) / 60);
    let s = Math.floor(d - h * 3600 - b * 60);
    b = b < 10 ? '0' + b : b;
    s = s < 10 ? '0' + s : s;
    return h > 0 ? h + ':' + b + ':' + s : b + ':' + s;
}
