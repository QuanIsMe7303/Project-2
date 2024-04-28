import { Col, Popover, Row } from 'antd';
import className from 'classnames/bind';
import styles from './HeaderComponent.module.scss';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlice';
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';

const cx = className.bind(styles);

const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
    };

    const userMenu = (
        <div className={cx('user-menu')}>
            <p className={cx('user-menu-item')}>Thông tin người dùng</p>
            <p className={cx('user-menu-item')} onClick={handleLogout}>
                Đăng xuất
            </p>
        </div>
    );

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
                    <Loading isLoading={loading}>
                        <div className={cx('account-wrapper')}>
                            <UserOutlined className={cx('user-icon')} />
                            {user?.name ? (
                                <Popover content={userMenu} trigger="click">
                                    <span className={cx('user-name')}>{user.name}</span>
                                </Popover>
                            ) : (
                                <div className={cx('text-wrapper')} onClick={handleNavigateLogin}>
                                    <span>Đăng nhập / Đăng ký</span>
                                </div>
                            )}
                        </div>
                    </Loading>

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
