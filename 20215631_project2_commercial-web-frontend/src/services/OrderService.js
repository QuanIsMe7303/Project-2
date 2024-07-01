import axios from 'axios';
import { axiosJWT } from './UserService';

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const getOrderByUserId = async (userId, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-detail/${userId}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/order/${id}`,
        { data: orderItems },
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        },
    );
    return res.data;
};
