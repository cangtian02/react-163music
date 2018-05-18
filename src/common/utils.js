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
