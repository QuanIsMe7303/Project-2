import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import classNames from 'classnames/bind';
import styles from './TypeProductPage.module.scss';
import CardComponent from '../../components/CartComponent/CartComponent';
import { Pagination } from 'antd';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';

const cx = classNames.bind(styles);

const TypeProductPage = () => {
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductType = async (type) => {
        setLoading(true);
        const res = await ProductService.getProductType(type);
        if (res?.status === 'OK') {
            setProducts(res?.data);
        } else {
            setLoading(false);
        }
        console.log(res);
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state);
        }
    }, [state]);

    const onChangePagination = () => {};

    return (
       <Loading isLoading={!loading}>
            <div className={cx('wrapper')}>
                <NavbarComponent />
                <div className={cx('product-container')}>
                    <div className={cx('products')}>
                        {products?.map((product) => {
                            return (
                                <CardComponent
                                    key={product._id}
                                    id={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    numberSold={product.numberSold}
                                    discount={product.discount}
                                />
                            );
                        })}
                    </div>
                    <div className={cx('pagination')}>
                        <Pagination defaultCurrent={1} total={2} onChange={onChangePagination} />
                    </div>
                </div>
            </div>
       </Loading>
    );
};

export default TypeProductPage;
