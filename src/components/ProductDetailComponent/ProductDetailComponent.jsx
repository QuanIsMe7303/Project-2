import { Col, Image, InputNumber, Row } from 'antd';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './ProductDetailComponent.module.scss';
import { WrapperInputNumber } from './style.js';

import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const cx = classNames.bind(styles);

const ProductDetailComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <Col className={cx('wrapper-left')} span={10}>
                <Image style={{ width: '400px' }} src={images.productLarge} alt="product-main" preview={false} />
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
                <h1>Điện thoại iPhone 15 Pro Max (256GB) - Chính hãng VN/A</h1>
                <div className={cx('rating-wrapper')}>
                    <span className={cx('rating')}>
                        <StarFilled className={cx('star-icon')} />
                        <StarFilled className={cx('star-icon')} />
                        <StarFilled className={cx('star-icon')} />
                        <StarFilled className={cx('star-icon')} />
                        <StarFilled className={cx('star-icon')} />
                    </span>
                    <span> | Đã bán 20</span>
                </div>
                <p className={cx('price')}>34.900.000đ</p>

                <div className={cx('quantity')}>
                    <span className={cx('quantity-label')}>Số lượng: </span>

                    <div className={cx('quantity-action')}>
                        <ButtonComponent
                            style={{ width: '30px', height: '30px' }}
                            icon={<MinusOutlined />}
                            size="small"
                        />
                        <WrapperInputNumber min={1} max={99} defaultValue={1} />
                        <ButtonComponent
                            style={{ width: '30px', height: '30px' }}
                            icon={<PlusOutlined />}
                            size="small"
                        />
                    </div>
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
                        text="Mua ngay"
                        styleText={{
                            fontSize: '1.3rem',
                            fontWeight: '600'
                        }}
                    />
                </div>
            </Col>
        </div>
    );
};

export default ProductDetailComponent;
