import classNames from 'classnames/bind';
import styles from './ProductTypes.module.scss';

const cx = classNames.bind(styles);

const ProductTypes = ({ name }) => {
    return <div className={cx('wrapper')}>{name}</div>;
};

export default ProductTypes;
