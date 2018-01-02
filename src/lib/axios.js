import { PG } from '@u51/pg/full';
import Axios from 'axios';
import toast from './toast';
import cache from './cache';

const axiosIns = Axios.create();
let getUserInfoPromise = PG.exec('u51GetUserInfo');

PG.on('U51PageResumeEvent', () => {
    getUserInfoPromise = PG.exec('u51GetUserInfo');
});

axiosIns.interceptors.request.use(config => {
    toast.loading(config.toastText);
    return config;
}, error => {
    toast.close('lastMsg');
    return Promise.reject(error);
});

// Add a response interceptor
axiosIns.interceptors.response.use(response => {
    toast.close(response.config.toastText);
    return response.data;
}, error => {
    toast.close(error.config ? error.config.toastText : 'lastMsg');
    if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
        toast.info(error.response.data.errors[0].message);
    } else if (error.message.indexOf('timeout') === 0) {
        toast.error('网络异常');
    } else {
        toast.error('出了点问题，暂时加载不出来，请稍后再来吧');
    }
    return Promise.reject(error);
});

export default (url, data = {}, method = 'get') => {
    const config = {};
    config.method = method;
    config.url = url;

    config.toastText = data.toastText || '';
    delete data.toastText;

    config.cacheData = data.cacheData;
    delete data.cacheData;

    if (method === 'get') {
        config.params = data;
    } else {
        // 有些时候，部分数据要放在query中
        if (data.params) {
            config.params = data.params;
            delete data.params;
        }
        config.data = data;
    }

    return Promise.all([getUserInfoPromise, PG.exec('u51GetLogEvent')]).then(values => {
        const [user, log] = values;
        let userHeader = {};
        if (user.uid && user.token) {
            userHeader = {
                userId: user.uid,
                Authorization: `encrypt ${user.token}`,
            };
        }
        config.headers = {
            ...userHeader,
            'X-Tracking-ID': log.tid,
        };
        return cache(config, axiosIns);
    });
};
