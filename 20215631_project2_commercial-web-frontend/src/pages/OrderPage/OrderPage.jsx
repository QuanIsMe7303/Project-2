import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './OrderPage.module.scss';
import { Checkbox, Image } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperInputNumber } from './style.js';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {
    decreaseAmount,
    increaseAmount,
    removeAllOrdersProduct,
    removeOrderProduct,
} from '../../redux/slices/orderSlice.js';

const cx = classNames.bind(styles);

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const [listChecked, setListChecked] = useState([]);

    const handleOnChangeCheckAll = (e) => {
        console.log('e.target.checked', e.target.checked);
        if (e.target.checked === true) {
            const newListChecked = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product);
            });
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };

    const handleOnChangeCheckbox = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value);
            setListChecked(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value]);
        }
    };

    console.log('listChecked', listChecked);

    const handleQuantity = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleRemoveProduct = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleRemoveAllProduct = () => {
        if (listChecked.length > 1) {
            dispatch(removeAllOrdersProduct({ listChecked }));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Giỏ hàng</h2>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('cart-body-top')}>
                        <div className={cx('cart-body-selectAll')}>
                            <Checkbox
                                onChange={handleOnChangeCheckAll}
                                checked={listChecked.length === order?.orderItems.length}
                            >
                                <p>Chọn tất cả</p>
                            </Checkbox>
                        </div>

                        <div className={cx('cart-body-deleteAll')} onClick={() => handleRemoveAllProduct()}>
                            <span>Xóa tất cả</span>
                            <DeleteOutlined />
                        </div>
                    </div>
                    <div className={cx('cart-header')}>
                        <div className={cx('cart-header-label')}>Sản phẩm</div>
                        <div className={cx('cart-header-label')}>Đơn giá</div>
                        <div className={cx('cart-header-label')}>Số lượng</div>
                        <div className={cx('cart-header-label')}>Thành tiền</div>
                        <div></div>
                    </div>

                    <div className={cx('cart-body')}>
                        {order?.orderItems.map((item) => (
                            <div className={cx('cart-item')} key={item.product}>
                                <Checkbox
                                    style={{ width: '100%' }}
                                    onChange={handleOnChangeCheckbox}
                                    value={item.product}
                                    checked={listChecked.includes(item.product)}
                                ></Checkbox>

                                <div className={cx('cart-item-image')}>
                                    <img src={item.image} alt="product-small" />
                                </div>
                                <div className={cx('cart-item-name')}>{item.name}</div>
                                <div className={cx('cart-item-price')}>{item.price.toLocaleString('vn-VN') + 'đ'}</div>
                                <div className={cx('cart-item-quantity')}>
                                    <ButtonComponent
                                        style={{ width: '30px', height: '30px' }}
                                        icon={<MinusOutlined />}
                                        size="small"
                                        onClick={() => handleQuantity('decrease', item.product)}
                                    />
                                    <WrapperInputNumber
                                        readOnly
                                        min={1}
                                        max={99}
                                        value={item?.amount}
                                        // onChange={handleChangeQuantity}
                                    />
                                    <ButtonComponent
                                        style={{ width: '30px', height: '30px' }}
                                        icon={<PlusOutlined />}
                                        size="small"
                                        onClick={() => handleQuantity('increase', item.product)}
                                    />
                                </div>
                                <div className={cx('cart-item-total')}>
                                    {(item.price * item.amount).toLocaleString('vn-VN') + 'đ'}
                                </div>
                                <div className={cx('cart-item-delete')}>
                                    <DeleteOutlined
                                        style={{ color: 'red' }}
                                        onClick={() => handleRemoveProduct(item.product)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('right')}>
                    <div className={cx('right-row')}>
                        <p>Tạm tính</p>
                        <span>0</span>
                    </div>
                    <div className={cx('right-row')}>
                        <p>Giảm giá</p>
                        <span>0</span>
                    </div>
                    <div className={cx('right-row')}>
                        <p>Phí vận chuyển</p>
                        <span>0</span>
                    </div>

                    <div className={cx('total-price')}>
                        <p>Tổng tiền</p>
                        <span>0</span>
                    </div>

                    <div className={cx('buy-button')}>
                        <button>Mua hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
