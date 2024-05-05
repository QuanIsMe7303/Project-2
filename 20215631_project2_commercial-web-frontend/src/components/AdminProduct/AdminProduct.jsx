import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';
import { Button, Form, Modal, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import InputComponent from '../InputComponent/InputComponent';
import { AddProductForm, CenteredRow } from './style';
import { getBase64 } from '../../utils';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';

const cx = classNames.bind(styles);

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
    });

    const mutation = useMutationHook((data) => {
        const { name, price, description, rating, image, type, countInStock } = data;
        const res = ProductService.createProduct({ name, price, description, rating, image, type, countInStock });
        return res;
    });

    const { data, isPending, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
        });
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
        console.log('product', stateProduct);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.name, e.target.value);
    };

    const handleOnChangeAvatar = async (fileInfo) => {
        // const file = fileList[0];
        const file = fileInfo.file;
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Quản lý sản phẩm</h1>

            <Button className={cx('add-button')} icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
                Thêm
            </Button>

            <div>
                <TableComponent />
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Loading isLoading={isPending}>
                    <AddProductForm
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Loại"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập loại sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng trong kho"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInStock}
                                onChange={handleOnChange}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập điểm đánh giá sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả sản phẩm!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>

                        <CenteredRow label="Hình ảnh" name="image">
                            <Upload onChange={handleOnChangeAvatar} showUploadList={false}>
                                <Button icon={<UploadOutlined />}>Chọn file</Button>
                            </Upload>
                            {stateProduct.image && (
                                <img src={stateProduct.image} alt="avatar" className={cx('avatar')} />
                            )}
                        </CenteredRow>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button className={cx('submit-btn')} type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </AddProductForm>
                </Loading>
            </Modal>
        </div>
    );
};

export default AdminProduct;
