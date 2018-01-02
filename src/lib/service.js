import axios from 'root/lib/axios';
import {
    userInfoPath,
    messageListPath,
} from './api';

export const fetchUserInfo = async (payload = {}) => {
    const response = await axios(userInfoPath, payload);
    return response;
};

export const messageList = async (payload = {}) => {
    const response = await axios(messageListPath, payload);
    return response;
};
