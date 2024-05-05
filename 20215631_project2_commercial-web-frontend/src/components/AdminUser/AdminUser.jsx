import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';

const cx = classNames.bind(styles);

const AdminUser = () => {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Quản lý người dùng</h1>

            <Button className={cx('add-button')} icon={<PlusOutlined />}>
                Thêm
            </Button>

            <div>
                <TableComponent />
            </div>
        </div>
    );
};

export default AdminUser;
