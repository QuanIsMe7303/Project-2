import { Menu } from 'antd';
import { useState } from 'react';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import HomePage from '../HomePage/HomePage';

const cx = classNames.bind(styles);

const AdminPage = () => {
    const items = [
        {
            key: 'user',
            icon: <UserOutlined />,
            label: 'Người dùng',
        },
        {
            key: 'product',
            icon: <AppstoreOutlined />,
            label: 'Sản phẩm',
        },
    ];

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const [keySelected, setKeySelected] = useState('');

    const handleOnClick = ({ key }) => {
        console.log('click', { key });
        setKeySelected(key);
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div className={cx('body')}>
                <Menu
                    mode="inline"
                    style={{
                        height: '100vh',
                        width: 256,
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div className={cx('main')}>{renderPage(keySelected)}</div>
            </div>
        </div>
    );
};

export default AdminPage;
