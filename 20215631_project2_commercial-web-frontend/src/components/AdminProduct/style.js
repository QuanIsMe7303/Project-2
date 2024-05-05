import { Form } from "antd";
import styled from "styled-components";

export const AddProductForm = styled(Form) `
    .ant-form-item-label {
        text-align: start;
    }
`

export const CenteredRow = styled(Form.Item)`
    .ant-form-item-row {
        display: flex;
        align-items: center;
    }
`