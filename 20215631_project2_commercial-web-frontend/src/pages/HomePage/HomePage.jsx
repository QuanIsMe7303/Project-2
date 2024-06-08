import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import ProductTypes from '../../components/ProductTypes/ProductTypes';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import images from '../../assets/images';
import CardComponent from '../../components/CartComponent/CartComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';

const cx = classNames.bind(styles);

const HomePage = () => {
    const searchProductValue = useSelector((state) => state.product?.search);
    const searchDebounce = useDebounce(searchProductValue, 1000);
    const refSearch = useRef(false);
    const [stateProducts, setStateProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const arr = ['Điện thoại', 'Laptop', 'Máy tính bảng'];
    const sliderArr = [images.slider1, images.slider2, images.slider3];

    const fetchProductAll = async (search) => {
        let res;
        if (search) {
            res = await ProductService.getAllProduct(search);
        } else {
            res = await ProductService.getAllProduct();
        }
        setStateProducts(res?.data);
    };

    useEffect(() => {
        if (refSearch.current) {
            setIsLoadingProducts(true);
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
        setIsLoadingProducts(false);
    }, [searchDebounce]);

    const { isPending, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        option: { retry: 3, retryDelay: 1000 },
    });

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProducts(products.data);
        }
    }, [products]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                {arr.map((item, index) => {
                    return <ProductTypes name={item} key={index} />;
                })}
            </div>
            <div className={cx('slider-wrapper')}>
                <SliderComponent arrImage={sliderArr} />
            </div>

            <Loading isLoading={isPending || isLoadingProducts}>
                <div className={cx('product-cart-wrapper')}>
                    {stateProducts.map((product) => {
                        return (
                            <CardComponent
                                key={product._id}
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
            </Loading>
        </div>
    );
};

export default HomePage;
