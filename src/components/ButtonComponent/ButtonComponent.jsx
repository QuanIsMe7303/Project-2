import { Button } from 'antd';

const ButtonComponent = ({ size, placeholder, bordered, icon, ...rests }) => {
    return <Button size={size} placeholder={placeholder} bordered={bordered} icon={icon} {...rests} />;
};

export default ButtonComponent;
