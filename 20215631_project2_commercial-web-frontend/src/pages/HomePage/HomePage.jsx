import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';

import ProductTypes from '../../components/ProductTypes/ProductTypes';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import images from '../../assets/images'
import CardComponent from '../../components/CartComponent/CartComponent';


const cx = classNames.bind(styles);

const HomePage = () => {
    const arr = ['Điện thoại', 'Laptop', 'Máy tính bảng'];
    const sliderArr = [images.slider1, images.slider2, images.slider3];


    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                {arr.map((item, index) => {
                    return <ProductTypes name={item} key={index} />;
                })}
            </div>
            <div className={cx('slider-wrapper')}>
                <SliderComponent arrImage={sliderArr}/>
            </div>

            <div className={cx('product-cart-wrapper')}>
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>


        </div>
    );
};

export default HomePage;
