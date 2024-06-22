import { Col, Image, InputNumber, Rate, Row } from 'antd';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './ProductDetailComponent.module.scss';
import { WrapperInputNumber } from './style.js';

import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slices/orderSlice.js';
const cx = classNames.bind(styles);

const ProductDetailComponent = ({ id }) => {
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleChangeQuantity = (e) => {
        setQuantity(Number(e.target.value));
    };

    const fetchGetDetailProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        console.log(id);
        const res = await ProductService.getDetailProduct(id);
        return res.data;
    };

    const { isPending, data: productDetail } = useQuery({
        queryKey: ['products-detail', id],
        queryFn: fetchGetDetailProduct,
        option: { enabled: !!id },
    });

    const handleQuantity = (type) => {
        if (type === 'decrease') {
            if (quantity === 1) {
                setQuantity(1);
            } else {
                setQuantity(quantity - 1);
            }
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location.pathname });
        } else {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: productDetail?.name,
                        amount: quantity,
                        image: productDetail?.image,
                        price: productDetail?.price,
                        product: productDetail?._id,
                    },
                }),
            );
        }
    };

    console.log('productDetail', productDetail);
    console.log('user', user);

    return (
        <Loading isLoading={isPending}>
            <div className={cx('wrapper')}>
                <Col className={cx('wrapper-left')} span={10}>
                    <Image
                        style={{ width: '400px', objectFit: 'cover' }}
                        src={productDetail?.image}
                        alt="product-main"
                        preview={false}
                    />
                    <Row>
                        <Col className={cx('small-image')} span={6}>
                            <Image src={images.productSmall1} alt="product-small" preview={false} />
                        </Col>
                        <Col className={cx('small-image')} span={6}>
                            <Image src={images.productSmall2} alt="product-small" preview={false} />
                        </Col>
                        <Col className={cx('small-image')} span={6}>
                            <Image src={images.productSmall3} alt="product-small" preview={false} />
                        </Col>
                        <Col className={cx('small-image')} span={6}>
                            <Image src={images.productSmall4} alt="product-small" preview={false} />
                        </Col>
                    </Row>
                </Col>
                <Col className={cx('wrapper-right')} span={14}>
                    <h1 className={cx('name')}>{productDetail?.name}</h1>
                    <div className={cx('rating-wrapper')}>
                        {/* <span className={cx('rating')}>{renderStars(productDetail?.rating)}</span> */}
                        <Rate allowHalf value={productDetail?.rating} disabled />
                        <span> | Đã bán 20</span>
                    </div>
                    <p className={cx('price')}>{productDetail?.price.toLocaleString('vn-VN') + 'đ'}</p>

                    <div className={cx('quantity')}>
                        <span className={cx('quantity-label')}>Số lượng: </span>

                        <div className={cx('quantity-action')}>
                            <ButtonComponent
                                style={{ width: '30px', height: '30px' }}
                                icon={<MinusOutlined />}
                                size="small"
                                onClick={() => handleQuantity('decrease')}
                            />
                            <WrapperInputNumber
                                readOnly
                                min={1}
                                max={99}
                                value={quantity}
                                onChange={handleChangeQuantity}
                            />
                            <ButtonComponent
                                style={{ width: '30px', height: '30px' }}
                                icon={<PlusOutlined />}
                                size="small"
                                onClick={() => handleQuantity('increase')}
                            />
                        </div>
                    </div>

                    <div className={cx('address')}>
                        <h4>Giao đến:</h4>
                        <p>{productDetail?.address}</p>
                    </div>

                    <div className={cx('description')}>
                        <h4>Mô tả sản phẩm:</h4>
                        <p>{productDetail?.description}</p>
                    </div>

                    <div className={cx('buy-button')}>
                        <ButtonComponent
                            styleButton={{
                                backgroundColor: 'red',
                                width: '220px',
                                height: '48px',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#fff',
                            }}
                            onClick={handleAddOrderProduct}
                            text="Mua ngay"
                            styleText={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                            }}
                        />
                    </div>
                </Col>
            </div>
        </Loading>
    );
};

export default ProductDetailComponent;
