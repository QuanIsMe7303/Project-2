import { Col, Row } from 'antd';
import className from 'classnames/bind';
import styles from './HeaderComponent.module.scss';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const cx = className.bind(styles);

const HeaderComponent = () => {
    return (
        <div>
            <Row className={cx('wrapper')}>
                <Col className={cx('logo')} span={3}>
                    LOGO
                </Col>
                <Col span={12}>
                    <ButtonInputSearch size="large" placeholder="Tìm kiếm sản phẩm..." textButton="Tìm kiếm" />
                </Col>
                <Col span={6} className={cx('header-right')}>
                    <div className={cx('account-wrapper')}>
                        <UserOutlined className={cx('user-icon')} />
                        <div className={cx('text-wrapper')}>
                            <span>Đăng nhập / Đăng ký</span>
                            <div className={cx('account')}>
                                <span>Tài khoản</span>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </div>

                    <div className={cx('cart-wrapper')}>
                        <ShoppingCartOutlined className={cx('cart-icon')} />
                        <span>Giỏ hàng</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HeaderComponent;
