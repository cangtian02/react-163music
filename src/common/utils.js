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

/**
 * 格式化处理歌词
 * @param {string} lyric 歌词 
 */
export function parseLyric(lyric) {
    let lines = lyric.split('\n');
    let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
    let result = [];
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    }
    lines[lines.length - 1].length === 0 && lines.pop();
    for (let data of lines) {
        let index = data.indexOf(']');
        let time = data.substring(0, index + 1);
        let value = data.substring(index + 1);
        let timeString = time.substring(1, time.length - 2);
        let timeArr = timeString.split(':');
        if (value !== '') {
            result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);
        }
    }
    result.sort(function (a, b) {
        return a[0] - b[0];
    });
    return result;
}

/**
 * 函数节流
 * @param {Function} fn 执行的函数
 * @param {number} delay 多少ms内清除调用函数
 */
export function throttle(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}
