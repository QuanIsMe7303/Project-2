import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './ButtonInputSearch.module.scss';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const cx = classNames.bind(styles);

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton } = props;
    return (
        <div className={cx('wrapper')}>
            <InputComponent className={cx('input')} size={size} placeholder={placeholder} bordered={false} {...props} />
            <ButtonComponent className={cx('button')} size={size} icon={<SearchOutlined />}>
                {textButton}
            </ButtonComponent>
        </div>
    );
};

export default ButtonInputSearch;
