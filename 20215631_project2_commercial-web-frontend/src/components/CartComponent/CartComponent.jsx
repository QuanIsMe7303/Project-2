import { Card } from 'antd';

import classNames from 'classnames/bind';
import styles from './CartComponent.module.scss';

import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const CardComponent = (props) => {
    const { id, countInStock, description, image, name, price, rating, type, numberSold, discount } = props;
    const navigate = useNavigate();

    const handleDetailProduct = (id) => {
        navigate(`/products-detail/${id}`);
    }

    return (
        <Card
            // style={{width: 'calc(20% - 20px)'}}
            hoverable
            cover={
                <img className={cx('card-image')}
                    alt="example"
                    src={image}
                />
            }
            onClick={() => handleDetailProduct(id)}
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
                <span className={cx('price')}>{price?.toLocaleString('vn-VN') + ' đ'}</span>
                <span className={cx('discount')}>{discount || 5}%</span>
            </div>
        </Card>
    );
};

export default CardComponent;
