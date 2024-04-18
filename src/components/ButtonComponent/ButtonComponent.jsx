import { Button } from 'antd';
import React from 'react';

const ButtonComponent = ({ size, styleButton, styleText, text, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
            }}
            size={size}
            {...rests}
        >
            <span style={styleText}>{text}</span>
        </Button>
    );
};

export default ButtonComponent;
