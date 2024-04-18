import { Checkbox, Rate, Row } from 'antd';

import classNames from 'classnames/bind';
import styles from './NavbarComponent.module.scss';

const cx = classNames.bind(styles);

const NavbarComponent = () => {
    const onChange = () => {};
    const renderComponent = (type, options) => {
        switch (type) {
            case 'list':
                return options.map((option) => {
                    return <p className={cx('list-item')}>{option}</p>;
                });

            case 'checkbox':
                return (
                    <Checkbox.Group className={cx('checkbox-group')} onChange={onChange}>
                        {options.map((option) => {
                            return <Checkbox value={option.value}>{option.label}</Checkbox>;
                        })}
                    </Checkbox.Group>
                );

            case 'rating':
                return options.map((option) => {
                    return (
                        <div className={cx('rating-item')}>
                            <Rate disabled defaultValue={option} />
                            <span>Từ {option} sao</span>
                        </div>
                    );
                });

            case 'price':
                return options.map((option) => {
                    return <span className={cx('price-item')}>{option}</span>;
                });

            default:
                return {};
        }
    };

    return (
        <div>
            <h4 className={cx('label')}>Danh mục sản phẩm</h4>
            <div className={cx('content')}>
                {renderComponent('list', ['Iphone', 'Ipad', 'Apple Watch'])}
                {renderComponent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                    { value: 'c', label: 'C' },
                ])}

                {renderComponent('rating', [5, 4, 3])}
                {renderComponent('price', ['Dưới 500.000đ', 'Từ 500.000đ đến 1.000.000đ', 'Từ 1.000.000đ trở lên'])}
            </div>
        </div>
    );
};

export default NavbarComponent;
