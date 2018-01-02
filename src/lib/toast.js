import toast from '@u51/miox-ui-toast';

let lastMsg = '';
let count = 0;
let loadingObj = null;

export default {
    loading: msg => {
        if (msg) {
            if (msg !== lastMsg) {
                if (loadingObj) {
                    loadingObj.close();
                }
                count = 0;
            }
            count = Math.max(0, count);
            lastMsg = msg;
            count++;
            loadingObj = toast.loading({
                message: msg,
                masked: true,
                maskStyle: {
                    background: 'rgba(0,0,0,0)',  // 设置mask样式
                },
            }, true);
        }
    },
    close: msg => {
        if (msg) {
            if (msg === 'lastMsg' || msg === lastMsg) {
                count--;
                if (count === 0) {
                    loadingObj.close();
                    loadingObj = null;
                }
            }
        }
    },
    info: msg => {
        toast.info(msg);
    },
    error: msg => {
        toast.error(msg);
    },
};
