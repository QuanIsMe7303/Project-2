import { Card } from 'antd';

import classNames from 'classnames/bind';
import styles from './CartComponent.module.scss';

import { StarFilled } from '@ant-design/icons';

const cx = classNames.bind(styles);

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, numberSold, discount } = props;

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            bodyStyle={{ padding: '14px' }}
            cover={
                <img
                    alt="example"
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png"
                />
            }
        >
            <p className={cx('card-name')}>{name}</p>
            <div className={cx('card-rating_sold')}>
                <div className={cx('rating')}>
                    <span>{rating}</span>
                    <StarFilled className={cx('star-icon')} />
                </div>
                <span className={cx('number-sold')}>Đã bán {numberSold || 1000}+</span>
            </div>

            <div className={cx('card-price')}>
                <span className={cx('price')}>{price.toLocaleString('vn-VN') + ' đ'}</span>
                <span className={cx('discount')}>{discount || 5}%</span>
            </div>
        </Card>
    );
};

export default CardComponent;
