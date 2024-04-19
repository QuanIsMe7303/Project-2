import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import classNames from 'classnames/bind';
import styles from './ProductDetailPage.module.scss';

const cx = classNames.bind(styles);

const ProductDetailPage = () => {
    return (
        <div className={cx('wrapper')}>
            <h4>Trang chủ</h4>

            <ProductDetailComponent />
        </div>
    );
};

export default ProductDetailPage;
