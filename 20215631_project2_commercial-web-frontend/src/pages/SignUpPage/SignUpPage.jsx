import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SignUpPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1>Tạo tài khoản mới</h1>
                <p>Đăng ký tài khoản</p>
                <div className={cx('form')}>
                    <div className={cx('form-email')}>
                        <p>Địa chỉ email: </p>
                        <InputForm type="text" placeholder="Nhập địa chỉ email..." />
                    </div>
                    <div className={cx('form-password')}>
                        <p>Mật khẩu:</p>
                        <InputForm type="password" placeholder="******" />
                    </div>
                    <div className={cx('form-confirm-password')}>
                        <p>Xác nhận mật khẩu:</p>
                        <InputForm type="password" placeholder="******" />
                    </div>
                </div>

                <ButtonComponent
                    styleButton={{
                        backgroundColor: 'red',
                        width: '100%',
                        height: '48px',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#fff',
                    }}
                    text="Đăng ký"
                    styleText={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                    }}
                />

                <div className={cx('bottom')}>
                    <div className={cx('make-account')}>
                        <p>Đã có tài khoản?</p>
                        <Link to="/sign-in">Đăng nhập ngay</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
