import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import ProductTypes from '../../components/ProductTypes/ProductTypes';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import images from '../../assets/images';
import CardComponent from '../../components/CartComponent/CartComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';

const cx = classNames.bind(styles);

const HomePage = () => {
    const arr = ['Điện thoại', 'Laptop', 'Máy tính bảng'];
    const sliderArr = [images.slider1, images.slider2, images.slider3];

    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        console.log(res);
        return res;
    };

    const { isPending, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll,
        option: { retry: 3, retryDelay: 1000 },
    });

    console.log('data', products);

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

            <div className={cx('product-cart-wrapper')}>
                {products?.data?.map((product) => {
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
        </div>
    );
};

export default HomePage;
