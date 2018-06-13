import es6promise from 'es6-promise';
import ajax from 'isomorphic-fetch';
es6promise.polyfill();

const api_url = 'http://111.231.93.106:9999/';

let fetch = (url, data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            let obj = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data
                })
            }

            ajax(api_url + url, obj).then(res => res.json()).then(res => {
                if (res.code !== 200) return console.log(url + ' api error');
                resolve(res);
            }).catch(error => {
                console.log('fetch post: +++  ' + error);
                reject(error);
            });
        } else {
            ajax(api_url + url).then(res => res.json()).then(res => {
                if (res.code !== 200) return console.log(url + ' api error');
                resolve(res);
            }).catch(error => {
                console.log('fetch get: +++  ' + error);
                reject(error);
            });
        }
    });
}

export default fetch;
