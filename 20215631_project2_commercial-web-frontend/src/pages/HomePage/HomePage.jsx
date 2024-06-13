import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import ProductTypes from '../../components/ProductTypes/ProductTypes';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import images from '../../assets/images';
import CardComponent from '../../components/CartComponent/CartComponent';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const cx = classNames.bind(styles);

const HomePage = () => {
    const searchProductValue = useSelector((state) => state.product?.search);
    const searchDebounce = useDebounce(searchProductValue, 1000);
    const refSearch = useRef();
    const [stateProducts, setStateProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [productLimit, setProductLimit] = useState(5);
    const arr = ['Điện thoại', 'Laptop', 'Máy tính bảng'];
    const sliderArr = [images.slider1, images.slider2, images.slider3];

    const fetchProductAll = async (context) => {
        try {
            const limit = context?.queryKey && context.queryKey[1];
            const search = context?.queryKey && context.queryKey[2];

            if (typeof limit !== 'number' || limit <= 0) {
                console.error('Invalid limit value:', limit);
                return [];
            }

            const res = await ProductService.getAllProduct(search, limit);

            if (res && res.data) {
                if (search?.length > 0 || refSearch.current) {
                    console.log(res);
                    setTotal(res.total);
                    setPage(res.totalPage);
                    setStateProducts(res.data);
                    return [];
                } else {
                    return res;
                }
            } else {
                console.error('Invalid response from ProductService.getAllProduct:', res);
                return [];
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Re-throw the error to be handled by the caller if needed
        }
    };

    // const fetchProductAll = async (context) => {
    //     const limit = context?.queryKey && context.queryKey[1];
    //     const search = context?.queryKey && context.queryKey[2];
    //     const res = await ProductService.getAllProduct(search, limit);
    //     if (search?.length > 0 || refSearch.current) {
    //         setStateProducts(res?.data);
    //         return [];
    //     } else {
    //         return res;
    //     }
    //     // console.log(search);
    //     // let res;
    //     // if (search) {
    //     //     res = await ProductService.getAllProduct(search);
    //     // } else {
    //     //     res = await ProductService.getAllProduct();
    //     // }
    //     // setStateProducts(res?.data);
    // };

    const { isPending, data: products } = useQuery({
        queryKey: ['products', productLimit, searchDebounce],
        queryFn: fetchProductAll,
        option: { retry: 3, retryDelay: 1000, keepPreviousData: true },
    });

    console.log('stateProducts', stateProducts, total);

    useEffect(() => {
        if (products?.data?.length > 0) {
            // console.log('products', products);
            setTotal(products?.total);
            setStateProducts(products.data);
        }
    }, [products]);

    useEffect(() => {
        if (refSearch.current) {
            setIsLoadingProducts(true);
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
        setIsLoadingProducts(false);
    }, [searchDebounce]);

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
                    {stateProducts?.map((product) => {
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
            </Loading>

            <div className={cx('load-more-btn-wrapper')}>
                <ButtonComponent
                    disabled={total === stateProducts.length || page === 1}
                    className={cx('load-more-products-btn')}
                    styleButton={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '20px 70px',
                        border: 'none',
                        borderRadius: '10px',
                        backgroundColor: '#3098ec',
                        color: '#fff',
                        fontSize: '1.6rem',
                        fontWeight: 600,
                    }}
                    onClick={() => setProductLimit((prev) => prev + 5)}
                    text={'Xem thêm'}
                ></ButtonComponent>
            </div>
        </div>
    );
};

export default HomePage;
