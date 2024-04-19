import { Input } from "antd"
import { useState } from "react"

const InputForm = (props) => {
    const [valueInput, setValueInput] = useState();
    const {type, placeholder = 'Nhập text', ...rest} = props;
    return (
        <Input type={type} placeholder={placeholder} valueInput={valueInput} {...rest} />
    )
}

export default InputForm;