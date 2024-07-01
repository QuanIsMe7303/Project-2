import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserOrders.module.scss';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const UserOrders = () => {
    const user = useSelector((state) => state.user);

    const fetchUserOrders = async () => await OrderService.getOrderByUserId(user?.id, user?.access_token);
    const queryOrders = useQuery({ queryKey: ['users'], queryFn: fetchUserOrders });
    const { isPending, data } = queryOrders;

    console.log(data);

    return (
        <Loading isLoading={isPending}>
            <div className={cx('wrapper')}>My Orders</div>
        </Loading>
    );
};

export default UserOrders;
