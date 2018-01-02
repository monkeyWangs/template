import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import {
    userInfoPath,
} from 'root/lib/api';

const mock = new MockAdapter(Axios);

// mock 数据

mock.onGet(userInfoPath).reply(200, {
    name: 'ennsssddd',
});

mock.onAny().passThrough();
