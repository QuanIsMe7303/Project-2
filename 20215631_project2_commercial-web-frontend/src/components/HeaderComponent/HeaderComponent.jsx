import { Col, Row } from 'antd';
import className from 'classnames/bind';
import styles from './HeaderComponent.module.scss';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = className.bind(styles);

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    console.log(user);

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
                    {user?.name ? (
                        <div className={cx('account-wrapper')}>
                            <UserOutlined className={cx('user-icon')} />
                            <span className={cx('user-name')}>{user.name}</span>
                        </div>
                    ) : (
                        <div className={cx('account-wrapper')}>
                            <UserOutlined className={cx('user-icon')} />
                            <div className={cx('text-wrapper')} onClick={handleNavigateLogin}>
                                <span>Đăng nhập / Đăng ký</span>
                                <div className={cx('account')}>
                                    <span>Tài khoản</span>
                                    <CaretDownOutlined />
                                </div>
                            </div>
                        </div>
                    )}

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
