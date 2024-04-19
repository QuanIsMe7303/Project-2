import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import classNames from 'classnames/bind';
import styles from './TypeProductPage.module.scss';
import CardComponent from '../../components/CartComponent/CartComponent';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

const TypeProductPage = () => {
    const onChangePagination = () => {};
    return (
        <div className={cx('wrapper')}>
            <NavbarComponent />
            <div className={cx('product-container')}>
                <div className={cx('products')}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                <div className={cx('pagination')}>
                    <Pagination defaultCurrent={1} total={2} onChange={onChangePagination} />
                </div>
            </div>
        </div>
    );
};

export default TypeProductPage;
