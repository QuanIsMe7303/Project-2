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
            // children: [
            //     {
            //         key: '11',
            //         label: 'Option 1',
            //     },
            //     {
            //         key: '12',
            //         label: 'Option 2',
            //     },
            //     {
            //         key: '13',
            //         label: 'Option 3',
            //     },
            //     {
            //         key: '14',
            //         label: 'Option 4',
            //     },
            // ],
        },
        {
            key: 'product',
            icon: <AppstoreOutlined />,
            label: 'Sản phẩm',
            // children: [
            //     {
            //         key: '21',
            //         label: 'Option 1',
            //     },
            //     {
            //         key: '22',
            //         label: 'Option 2',
            //     },
            //     {
            //         key: '23',
            //         label: 'Submenu',
            //         children: [
            //             {
            //                 key: '231',
            //                 label: 'Option 1',
            //             },
            //             {
            //                 key: '232',
            //                 label: 'Option 2',
            //             },
            //             {
            //                 key: '233',
            //                 label: 'Option 3',
            //             },
            //         ],
            //     },
            //     {
            //         key: '24',
            //         label: 'Submenu 2',
            //         children: [
            //             {
            //                 key: '241',
            //                 label: 'Option 1',
            //             },
            //             {
            //                 key: '242',
            //                 label: 'Option 2',
            //             },
            //             {
            //                 key: '243',
            //                 label: 'Option 3',
            //             },
            //         ],
            //     },
            // ],
        },
    ];

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <HomePage></HomePage>;
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
