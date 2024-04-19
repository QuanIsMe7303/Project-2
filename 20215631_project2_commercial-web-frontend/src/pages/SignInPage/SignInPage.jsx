import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SignInPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1>Xin chào</h1>
                <p>Đăng nhập vào hệ thống</p>
                <div className={cx('form')}>
                    <div className={cx('form-email')}>
                        <p>Địa chỉ email: </p>
                        <InputForm type="text" placeholder="Nhập địa chỉ email..." />
                    </div>
                    <div className={cx('form-password')}>
                        <p>Mật khẩu:</p>
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
                    text="Đăng nhập"
                    styleText={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                    }}
                />
    
                <div className={cx('bottom')}>
                    <p className={cx('forget-password')}>Quên mật khẩu</p>
                    <div className={cx('make-account')}>
                        <p>Chưa có tài khoản?</p>
                        <Link to="/sign-up">Tạo tài khoản</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
