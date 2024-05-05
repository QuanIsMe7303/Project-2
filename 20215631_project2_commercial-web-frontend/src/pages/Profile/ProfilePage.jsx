import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slices/userSlice';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

const cx = classNames.bind(styles);

const ProfilePage = () => {
    const user = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const mutation = useMutationHook((data) => {
        const { id, access_token, ...rest } = data;
        UserService.updateUser(id, rest, access_token);
    });

    const dispatch = useDispatch();
    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };

    const handleOnChangeName = (e) => {
        setName(e.target.value);
    };
    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleOnChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleOnChangeAvatar = async (fileInfo) => {
        // const file = fileList[0];
        const file = fileInfo.file;
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Thông tin người dùng</h1>
            <Loading isLoading={isPending}>
                <div className={cx('main')}>
                    <div className={cx('row')}>
                        <h4 className={cx('label')}>Name</h4>
                        <InputForm className={cx('input')} id="name" value={name} onChange={handleOnChangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            text={'Cập nhật'}
                            styleButton={{ height: '100%' }}
                            styleText={{ color: 'rgb(26, 148, 255)', fontWeight: '600' }}
                        />
                    </div>

                    <div className={cx('row')}>
                        <h4 className={cx('label')}>Email</h4>
                        <InputForm className={cx('input')} id="email" value={email} onChange={handleOnChangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            text={'Cập nhật'}
                            styleButton={{ height: '100%' }}
                            styleText={{ color: 'rgb(26, 148, 255)', fontWeight: '600' }}
                        />
                    </div>

                    <div className={cx('row')}>
                        <h4 className={cx('label')}>Số điện thoại</h4>
                        <InputForm className={cx('input')} id="phone" value={phone} onChange={handleOnChangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            text={'Cập nhật'}
                            styleButton={{ height: '100%' }}
                            styleText={{ color: 'rgb(26, 148, 255)', fontWeight: '600' }}
                        />
                    </div>

                    <div className={cx('row')}>
                        <h4 className={cx('label')}>Địa chỉ</h4>
                        <InputForm
                            className={cx('input')}
                            id="address"
                            value={address}
                            onChange={handleOnChangeAddress}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            text={'Cập nhật'}
                            styleButton={{ height: '100%' }}
                            styleText={{ color: 'rgb(26, 148, 255)', fontWeight: '600' }}
                        />
                    </div>

                    <div className={cx('row')}>
                        <h4 className={cx('label')}>Ảnh đại diện</h4>
                        <Upload onChange={handleOnChangeAvatar} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>Chọn file</Button>
                        </Upload>
                        {avatar && <img src={avatar} alt="avatar" className={cx('avatar')} />}
                        {/* <InputForm className={cx('input')} id="avatar" value={avatar} onChange={handleOnChangeAvatar} /> */}
                        <ButtonComponent
                            onClick={handleUpdate}
                            text={'Cập nhật'}
                            styleButton={{ height: '100%' }}
                            styleText={{ color: 'rgb(26, 148, 255)', fontWeight: '600' }}
                        />
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default ProfilePage;
