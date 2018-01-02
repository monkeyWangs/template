import { PG } from '@u51/pg/full';

export const componentX = {
    cancel: {
        code: '',
        msg: '',
    },
};

export const PageA = {
    confirm: {
        code: '',
        msg: '',
    },
};

export default function loggerSend(page, event, msg = '', rqd = {}) {
    PG.Log.send(page, event, {
        content: {
            events: {
                msg,
            },
            retention: {
                rqd,
            },
        },
    });
}

export function loggerHelper(page) {
    return target => {
        target.prototype.sendLogger = (event, msg, rqd) => {
            loggerSend(page, event, msg, rqd);
        };
    };
}
